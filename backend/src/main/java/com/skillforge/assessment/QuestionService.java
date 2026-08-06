package com.skillforge.assessment;

import com.skillforge.assessment.dto.QuestionAdminResponse;
import com.skillforge.assessment.dto.QuestionRequest;
import com.skillforge.assessment.dto.QuestionResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;

    // ---- Admin: question bank CRUD (FR-3.1) ----

    public List<QuestionAdminResponse> listByCourseAdmin(UUID courseId) {
        return questionRepository.findByCourseId(courseId).stream()
                .map(QuestionAdminResponse::from)
                .toList();
    }

    public QuestionAdminResponse create(QuestionRequest req) {
        Question q = new Question();
        applyRequest(q, req);
        return QuestionAdminResponse.from(questionRepository.save(q));
    }

    public QuestionAdminResponse update(UUID id, QuestionRequest req) {
        Question q = findOrThrow(id);
        applyRequest(q, req);
        return QuestionAdminResponse.from(questionRepository.save(q));
    }

    public void delete(UUID id) {
        if (!questionRepository.existsById(id)) {
            throw new EntityNotFoundException("Question not found: " + id);
        }
        questionRepository.deleteById(id);
    }

    private void applyRequest(Question q, QuestionRequest req) {
        q.setCourseId(req.courseId());
        q.setType(req.type());
        q.setDifficulty(req.difficulty());
        q.setTopic(req.topic());
        q.setContent(req.content());
        q.setOptionsJson(req.optionsJson());
        q.setCorrectAnswer(req.correctAnswer());
        q.setTestCasesJson(req.testCasesJson());
        q.setExplanation(req.explanation());
    }

    // ---- Student: dynamic/randomized practice serving (FR-3.3) ----

    /**
     * Returns up to `count` questions for the given topic/difficulty, order
     * randomized, and - if the pool is larger than count - selection randomized
     * too, so repeated attempts differ. Never exposes correctAnswer/testCases.
     */
    public List<QuestionResponse> getPracticeSet(UUID courseId, String topic, Difficulty difficulty, int count) {
        List<Question> pool = (difficulty != null)
                ? questionRepository.findByCourseIdAndTopicAndDifficulty(courseId, topic, difficulty)
                : questionRepository.findByCourseIdAndTopic(courseId, topic);

        Collections.shuffle(pool); // randomizes both order and, via subList, selection

        return pool.stream()
                .limit(count)
                .map(QuestionResponse::from)
                .toList();
    }

    Question findOrThrow(UUID id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Question not found: " + id));
    }
}

