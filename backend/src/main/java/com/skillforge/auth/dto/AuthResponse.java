package com.skillforge.auth.dto;

import com.skillforge.auth.User;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresIn,
        String email,
        String fullName,
        String role
) {
    public static AuthResponse fromUser(User user, String accessToken, String refreshToken, long expiresIn) {
        return new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                expiresIn,
                user.getEmail(),
                user.getFullName(),
                user.getRole().name()
        );
    }
}
