package com.skillforge.auth.dto;

import com.skillforge.auth.UserStatus;
import jakarta.validation.constraints.NotNull;

public record UserStatusUpdateRequest(
        @NotNull(message = "Status is required") UserStatus status,
        String reason
) {}
