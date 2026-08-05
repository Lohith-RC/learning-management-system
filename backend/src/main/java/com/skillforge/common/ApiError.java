package com.skillforge.common;

import java.time.Instant;
import java.util.List;

/**
 * Standard error shape returned by every endpoint in the backend.
 * All services (Course, Assessment, Auth, Admin, Profile, Streak) must use this
 * via GlobalExceptionHandler rather than inventing their own error format.
 */
public record ApiError(
        Instant timestamp,
        int status,
        String error,
        String message,
        List<String> details
) {
    public static ApiError of(int status, String error, String message, List<String> details) {
        return new ApiError(Instant.now(), status, error, message, details);
    }
}
