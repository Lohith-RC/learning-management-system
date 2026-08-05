package com.skillforge.assessment.dto;

import java.util.UUID;

import com.skillforge.assessment.Difficulty;
import com.skillforge.assessment.QuestionType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record QuestionRequest(
        @NotNull UUID courseId,
        @NotNull QuestionType type,
        @NotNull Difficulty difficulty,
        @NotBlank String topic,
        @NotBlank String content,
        String optionsJson,      // required for MCQ
        String correctAnswer,    // required for MCQ/DESCRIPTIVE
        String testCasesJson,    // required for CODING
        String explanation
) {
}
