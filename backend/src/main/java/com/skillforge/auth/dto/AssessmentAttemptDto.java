package com.skillforge.auth.dto;

import java.time.Instant;
import java.util.UUID;

public record AssessmentAttemptDto(
        UUID attemptId,
        UUID questionId,
        String questionTitle,
        String questionType,
        Boolean isCorrect,
        Double score,
        Instant attemptedAt
) {}
