package com.skillforge.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
<<<<<<< HEAD
        @NotBlank(message = "email is required")
        @Email(message = "must be a valid email")
        String email,

        @NotBlank(message = "password is required")
        @Size(min = 8, max = 128, message = "password must be 8-128 characters")
        String password,

        @Size(max = 100) String fullName
) {
}
=======
        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,
        @NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters") String password,
        @NotBlank(message = "Full name is required") String fullName
) {}
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
