package com.skillforge.profile.dto;

import java.util.List;
import java.util.UUID;

/**
 * Aggregated learning progress and assessment accuracy for one enrolled course.
 */
public record CourseProgressDTO(
        UUID courseId,
        String courseName,
        double progressPercent,
        double testAccuracyPercent,
        List<ModuleCompletionDetailDTO> moduleCompletionDetails
) {
}
