package com.skillforge.course;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "enrollment", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "course_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "course_id", nullable = false)
    private UUID courseId;

    @Column(name = "enrolled_at", updatable = false)
    private Instant enrolledAt;

    @Column(name = "progress_percent", nullable = false)
    private Double progressPercent = 0.0;

    @PrePersist
    void onCreate() {
        this.enrolledAt = Instant.now();
        this.progressPercent = 0.0;
    }
}
