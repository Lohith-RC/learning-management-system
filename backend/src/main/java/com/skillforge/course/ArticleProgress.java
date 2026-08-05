package com.skillforge.course;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * One row per (user, article) once the article has been marked read.
 * Absence of a row = unread. Keeps the read/unread check cheap and avoids
 * a boolean column on every article for every user.
 */
@Entity
@Table(name = "article_progress", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "article_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleProgress {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "article_id", nullable = false)
    private UUID articleId;

    @Column(name = "read_at", updatable = false)
    private Instant readAt;

    @PrePersist
    void onCreate() {
        this.readAt = Instant.now();
    }
}
