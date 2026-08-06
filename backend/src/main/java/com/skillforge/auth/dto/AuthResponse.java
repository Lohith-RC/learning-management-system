package com.skillforge.auth.dto;

<<<<<<< HEAD
import java.util.UUID;

public record AuthResponse(
        UUID userId,
        String email,
        String fullName,
        String role,
        String accessToken,
        String refreshToken
) {
=======
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
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
}
