package com.skillforge.auth.dto;

import com.skillforge.auth.User;
import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        String fullName,
        String role,
        String status,
        LocalDateTime createdAt
) {
    public static UserResponse fromUser(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole().name(),
                user.getStatus().name(),
                user.getCreatedAt()
        );
    }
}
