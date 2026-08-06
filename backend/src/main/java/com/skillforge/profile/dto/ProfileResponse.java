package com.skillforge.profile.dto;

import java.util.List;
import java.util.UUID;

/**
 * Student profile summary: overall progress/accuracy plus per-course breakdown.
 */
public record ProfileResponse(
        UUID studentId,
        double overallProgressPercent,
        double overallAccuracyPercent,
        List<CourseProgressDTO> courses
) {
}
