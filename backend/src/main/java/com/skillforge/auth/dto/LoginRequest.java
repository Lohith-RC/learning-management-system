package com.skillforge.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
<<<<<<< HEAD
        @NotBlank(message = "email is required")
        @Email(message = "must be a valid email")
        String email,

        @NotBlank(message = "password is required")
        String password
) {
}
=======
        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,
        @NotBlank(message = "Password is required") String password
) {}
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
