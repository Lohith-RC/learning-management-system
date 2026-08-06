package com.skillforge.assessment.dto;

import java.util.UUID;

public record SubmitAnswerResponse(
        UUID attemptId,
        boolean isCorrect,
        double score,
        String explanation
) {
}
