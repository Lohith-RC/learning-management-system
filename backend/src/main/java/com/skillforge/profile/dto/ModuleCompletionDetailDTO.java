package com.skillforge.profile.dto;

import java.util.UUID;

/**
 * Per-module article completion breakdown for a enrolled course.
 */
public record ModuleCompletionDetailDTO(
        UUID moduleId,
        String moduleTitle,
        int totalArticles,
        int readArticles,
        double progressPercent
) {
}
