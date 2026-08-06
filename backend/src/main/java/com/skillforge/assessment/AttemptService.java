package com.skillforge.assessment;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.assessment.dto.SubmitAnswerRequest;
import com.skillforge.assessment.dto.SubmitAnswerResponse;
import com.skillforge.assessment.dto.SubmitCodeRequest;
import com.skillforge.assessment.dto.SubmitCodeResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor; 
import com.skillforge.streak.StreakService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AttemptService {

    private final QuestionRepository questionRepository;
    private final AttemptRepository attemptRepository;
    private final CodeExecutionClient codeExecutionClient;
    private final ObjectMapper objectMapper;
    private final StreakService streakService;

    /**
     * FR-3.5: instant auto-grading for MCQ. DESCRIPTIVE questions are recorded
     * but not auto-scored (no reliable auto-grading method for free text in
     * Phase 1) - isCorrect/score are left null, pending manual/future review.
     */
    public SubmitAnswerResponse submitAnswer(UUID questionId, UUID userId, SubmitAnswerRequest req) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found: " + questionId));

        Attempt attempt = new Attempt();
        attempt.setUserId(userId);
        attempt.setQuestionId(questionId);
        attempt.setAnswer(req.answer());
        attempt.setTimeTaken(req.timeTakenSeconds());

        boolean isCorrect = false;
        double score = 0.0;

        if (question.getType() == QuestionType.MCQ) {
            isCorrect = gradeMcq(question.getCorrectAnswer(), req.answer());
            score = isCorrect ? 100.0 : 0.0;
            attempt.setIsCorrect(isCorrect);
            attempt.setScore(score);
        } else {
            // DESCRIPTIVE - store the submission, leave grading fields null
            attempt.setIsCorrect(null);
            attempt.setScore(null);
        }

        Attempt saved = attemptRepository.save(attempt);

        // update streak for qualifying activity (assessment submitted)
        try {
            streakService.updateStreak(userId);
        } catch (Exception ignored) {
            // do not fail the grading flow if streak update fails
        }

        return new SubmitAnswerResponse(
                saved.getId(),
                isCorrect,
                score,
                question.getExplanation()
        );
    }

    private boolean gradeMcq(String correctAnswerJson, String submittedAnswerJson) {
        try {
            Set<Integer> correct = new HashSet<>(
                    objectMapper.readValue(correctAnswerJson, new TypeReference<List<Integer>>() {}));
            Set<Integer> submitted = new HashSet<>(
                    objectMapper.readValue(submittedAnswerJson, new TypeReference<List<Integer>>() {}));
            return correct.equals(submitted);
        } catch (Exception e) {
            // malformed JSON in either field - treat as incorrect rather than failing the request
            return false;
        }
    }

    /**
     * FR-3.4: coding submission. Sandbox integration is stubbed - see
     * CodeExecutionClient. The endpoint contract is final even though the
     * underlying execution isn't wired to a real provider yet.
     */
    public SubmitCodeResponse submitCode(UUID questionId, UUID userId, SubmitCodeRequest req) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found: " + questionId));

        CodeExecutionClient.CodeExecutionResult result =
                codeExecutionClient.execute(req.code(), req.language(), question.getTestCasesJson());

        Attempt attempt = new Attempt();
        attempt.setUserId(userId);
        attempt.setQuestionId(questionId);
        attempt.setAnswer(req.code());
        attempt.setIsCorrect("PASS".equals(result.status()) ? true : ("FAIL".equals(result.status()) ? false : null));
        attempt.setScore("PASS".equals(result.status()) ? 100.0 : 0.0);

        Attempt saved = attemptRepository.save(attempt);

        // update streak for qualifying activity (assessment submitted)
        try {
            streakService.updateStreak(userId);
        } catch (Exception ignored) {
            // do not fail the submission flow if streak update fails
        }

        return new SubmitCodeResponse(saved.getId(), result.status(), result.resultsJson(), result.runtimeMs());
    }
}

