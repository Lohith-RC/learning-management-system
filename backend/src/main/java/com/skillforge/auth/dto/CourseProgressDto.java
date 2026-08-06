package com.skillforge.auth.dto;

import java.time.Instant;
import java.util.UUID;

public record CourseProgressDto(
        UUID courseId,
        String courseName,
        Double progressPercent,
        Instant enrolledAt
) {}
