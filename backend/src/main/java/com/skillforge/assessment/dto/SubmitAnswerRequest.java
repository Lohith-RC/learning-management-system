package com.skillforge.assessment.dto;

import jakarta.validation.constraints.NotBlank;

public record SubmitAnswerRequest(
        @NotBlank String answer, // JSON array of selected option indices for MCQ, e.g. "[0,2]"
        Integer timeTakenSeconds
) {
}
