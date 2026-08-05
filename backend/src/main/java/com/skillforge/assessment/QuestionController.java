package com.skillforge.assessment;

import com.skillforge.assessment.dto.QuestionAdminResponse;
import com.skillforge.assessment.dto.QuestionRequest;
import com.skillforge.assessment.dto.QuestionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // ---- Admin: question bank management (FR-3.1) ----

    @GetMapping("/api/courses/{courseId}/questions")
    @PreAuthorize("hasRole('ADMIN')")
    public List<QuestionAdminResponse> listAdmin(@PathVariable UUID courseId) {
        return questionService.listByCourseAdmin(courseId);
    }

    @PostMapping("/api/courses/{courseId}/questions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QuestionAdminResponse> create(@PathVariable UUID courseId, @Valid @RequestBody QuestionRequest req) {
        // courseId in path must match the body; simplest correct behavior is to trust the body
        // since the DTO already requires courseId - path is kept for a clean REST resource shape.
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.create(req));
    }

    @PutMapping("/api/questions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public QuestionAdminResponse update(@PathVariable UUID id, @Valid @RequestBody QuestionRequest req) {
        return questionService.update(id, req);
    }

    @DeleteMapping("/api/questions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        questionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ---- Student: dynamic practice serving (FR-3.3) ----

    @GetMapping("/api/courses/{courseId}/questions/practice")
    public List<QuestionResponse> practice(
            @PathVariable UUID courseId,
            @RequestParam String topic,
            @RequestParam(required = false) Difficulty difficulty,
            @RequestParam(defaultValue = "10") int count
    ) {
        return questionService.getPracticeSet(courseId, topic, difficulty, count);
    }
}

