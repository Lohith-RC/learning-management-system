package com.skillforge.assessment.dto;

import java.util.UUID;

import com.skillforge.assessment.Difficulty;
import com.skillforge.assessment.Question;
import com.skillforge.assessment.QuestionType;

/**
 * Student-facing view of a question - deliberately omits correctAnswer and
 * testCasesJson so a student can't inspect the answer via the network tab
 * before submitting.
 */
public record QuestionResponse(
        UUID id,
        UUID courseId,
        QuestionType type,
        Difficulty difficulty,
        String topic,
        String content,
        String optionsJson
) {
    public static QuestionResponse from(Question q) {
        return new QuestionResponse(
                q.getId(), q.getCourseId(), q.getType(), q.getDifficulty(),
                q.getTopic(), q.getContent(), q.getOptionsJson()
        );
    }
}
