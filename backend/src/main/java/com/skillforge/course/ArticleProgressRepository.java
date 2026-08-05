package com.skillforge.course;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticleProgressRepository extends JpaRepository<ArticleProgress, UUID> {
    Optional<ArticleProgress> findByUserIdAndArticleId(UUID userId, UUID articleId);
    List<ArticleProgress> findByUserId(UUID userId);
}
