package com.skillforge.course;

import com.skillforge.profile.projection.ModuleCompletionView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ModuleRepository extends JpaRepository<Module, UUID> {
    List<Module> findByCourseIdOrderByOrderIndexAsc(UUID courseId);

    @Query("""
            SELECT m.id AS moduleId,
                   m.title AS moduleTitle,
                   (SELECT COUNT(a) FROM Article a WHERE a.moduleId = m.id) AS totalArticles,
                   (SELECT COUNT(ap)
                    FROM ArticleProgress ap
                    JOIN Article a2 ON a2.id = ap.articleId
                    WHERE a2.moduleId = m.id AND ap.userId = :userId) AS readArticles
            FROM Module m
            WHERE m.courseId = :courseId
            ORDER BY m.orderIndex ASC
            """)
    List<ModuleCompletionView> findModuleCompletionByCourseIdAndUserId(
            @Param("courseId") UUID courseId,
            @Param("userId") UUID userId
    );
}
