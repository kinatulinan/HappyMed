package com.example.demo.service;

import com.example.demo.entity.AuditLog;
import com.example.demo.repository.AuditLogRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void record(String username, Collection<? extends GrantedAuthority> authorities, String action, String details) {
        String roles = authorities == null ? "" :
                authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(","));

        AuditLog log = new AuditLog(LocalDateTime.now(), username, roles, action, details);
        auditLogRepository.save(log);
    }

    public List<AuditLog> getAll() {
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }
}

