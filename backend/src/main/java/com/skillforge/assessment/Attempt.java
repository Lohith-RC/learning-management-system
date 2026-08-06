package com.skillforge.assessment;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attempt")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attempt {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "question_id", nullable = false)
    private UUID questionId;

    @Column(columnDefinition = "text")
    private String answer; // raw submitted answer (option indices JSON, or code, or free text)

    @Column(name = "is_correct")
    private Boolean isCorrect; // null until graded (e.g. coding submission pending sandbox result)

    private Double score;

    @Column(name = "time_taken")
    private Integer timeTaken; // seconds, optional

    @Column(name = "attempted_at", updatable = false)
    private Instant attemptedAt;

    @PrePersist
    void onCreate() {
        this.attemptedAt = Instant.now();
    }
}
