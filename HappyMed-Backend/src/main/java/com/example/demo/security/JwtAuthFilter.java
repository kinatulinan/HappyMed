package com.example.demo.security;

import com.example.demo.debug.DebugLogger;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        // #region agent log
        DebugLogger.log(
                "H1",
                "pre-fix",
                "JwtAuthFilter.doFilterInternal",
                "Incoming request",
                "method=" + request.getMethod() + ",uri=" + request.getRequestURI()
        );
        // #endregion

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // #region agent log
            DebugLogger.log(
                    "H1",
                    "pre-fix",
                    "JwtAuthFilter.doFilterInternal",
                    "No or invalid Authorization header",
                    "hasAuthHeader=" + (authHeader != null)
            );
            // #endregion
            filterChain.doFilter(request, response);

            // #region agent log
            DebugLogger.log(
                    "H4",
                    "pre-fix",
                    "JwtAuthFilter.doFilterInternal",
                    "Response status after chain (no auth header)",
                    "status=" + response.getStatus()
            );
            // #endregion
            return;
        }

        final String jwt = authHeader.substring(7);
        String username;
        try {
            username = jwtService.extractUsername(jwt);
        } catch (Exception ex) {
            // #region agent log
            DebugLogger.log(
                    "H2",
                    "pre-fix",
                    "JwtAuthFilter.doFilterInternal",
                    "Failed to extract username from JWT",
                    "errorClass=" + ex.getClass().getSimpleName()
            );
            // #endregion
            filterChain.doFilter(request, response);
            return;
        }

        // #region agent log
        DebugLogger.log(
                "H2",
                "pre-fix",
                "JwtAuthFilter.doFilterInternal",
                "Extracted username from JWT",
                "username=" + username
        );
        // #endregion

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // #region agent log
                DebugLogger.log(
                        "H2",
                        "pre-fix",
                        "JwtAuthFilter.doFilterInternal",
                        "Authentication set in context",
                        "principal=" + userDetails.getUsername()
                );
                // #endregion
            } else {
                // #region agent log
                DebugLogger.log(
                        "H2",
                        "pre-fix",
                        "JwtAuthFilter.doFilterInternal",
                        "JWT not valid for user",
                        "username=" + userDetails.getUsername()
                );
                // #endregion
            }
        }

        filterChain.doFilter(request, response);

        // #region agent log
        DebugLogger.log(
                "H4",
                "pre-fix",
                "JwtAuthFilter.doFilterInternal",
                "Response status after chain",
                "status=" + response.getStatus()
        );
        // #endregion
    }
}
