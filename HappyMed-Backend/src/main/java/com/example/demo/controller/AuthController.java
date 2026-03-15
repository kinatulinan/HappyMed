package com.example.demo.controller;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.entity.UserAccount;
import com.example.demo.entity.UserRole;
import com.example.demo.repository.UserAccountRepository;
import com.example.demo.security.JwtService;
import com.example.demo.service.AuditLogService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AuditLogService auditLogService;

    public AuthController(
            UserAccountRepository userAccountRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            AuditLogService auditLogService
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.auditLogService = auditLogService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequest request) {
        Optional<UserAccount> existing = userAccountRepository.findByUsername(request.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        String roleString = Optional.ofNullable(request.getRole())
                .map(r -> r.toUpperCase(Locale.ROOT))
                .orElse(UserRole.PHARMACIST.name());

        UserRole role;
        try {
            role = UserRole.valueOf(roleString);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Invalid role: " + request.getRole());
        }

        UserAccount user = new UserAccount();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userAccountRepository.save(user);

        auditLogService.record(
                user.getUsername(),
                user.getAuthorities(),
                "REGISTER",
                "New account registered with role " + role.name()
        );

        return ResponseEntity.ok("Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserAccount user = (UserAccount) authentication.getPrincipal();
        String token = jwtService.generateToken(user, Map.of(
                "role", user.getRole().name()
        ));

        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        auditLogService.record(
                user.getUsername(),
                authentication.getAuthorities(),
                "LOGIN",
                "User logged in"
        );

        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getUsername(),
                roles
        );
        return ResponseEntity.ok(new AuthResponse(token, userDto));
    }
}

