package com.skillforge.assessment.dto;

import java.time.Instant;
import java.util.UUID;

import com.skillforge.assessment.Difficulty;
import com.skillforge.assessment.Question;
import com.skillforge.assessment.QuestionType;

/** Admin-facing view - includes the correct answer, used only by question-bank management endpoints. */
public record QuestionAdminResponse(
        UUID id,
        UUID courseId,
        QuestionType type,
        Difficulty difficulty,
        String topic,
        String content,
        String optionsJson,
        String correctAnswer,
        String testCasesJson,
        String explanation,
        Instant createdAt
) {
    public static QuestionAdminResponse from(Question q) {
        return new QuestionAdminResponse(
                q.getId(), q.getCourseId(), q.getType(), q.getDifficulty(), q.getTopic(),
                q.getContent(), q.getOptionsJson(), q.getCorrectAnswer(), q.getTestCasesJson(),
                q.getExplanation(), q.getCreatedAt()
        );
    }
}
