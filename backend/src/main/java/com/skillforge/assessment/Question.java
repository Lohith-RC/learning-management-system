package com.skillforge.assessment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "course_id", nullable = false)
    private UUID courseId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false)
    private String topic;

    @Column(columnDefinition = "text", nullable = false)
    private String content; // the question text/prompt

    // MCQ: JSON array of options, e.g. ["Option A","Option B",...]. Null for CODING/DESCRIPTIVE.
    @Column(name = "options_json", columnDefinition = "text")
    private String optionsJson;

    // MCQ: JSON array of correct option indices, e.g. [0] or [0,2] for multi-select.
    // CODING: not used here - see testCasesJson instead.
    // DESCRIPTIVE: plain text model answer, not JSON.
    @Column(name = "correct_answer", columnDefinition = "text")
    private String correctAnswer;

    // CODING: JSON array of test cases, e.g. [{"input":"...","expectedOutput":"..."}]
    @Column(name = "test_cases_json", columnDefinition = "text")
    private String testCasesJson;

    @Column(columnDefinition = "text")
    private String explanation;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }
}

