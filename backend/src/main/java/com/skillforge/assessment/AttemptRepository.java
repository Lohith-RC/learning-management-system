package com.skillforge.assessment;

import com.skillforge.profile.projection.CourseAccuracyView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface AttemptRepository extends JpaRepository<Attempt, UUID> {
    List<Attempt> findByUserIdAndQuestionId(UUID userId, UUID questionId);
    List<Attempt> findByUserId(UUID userId);

    @Query("""
            SELECT CASE
                       WHEN COUNT(CASE WHEN a.isCorrect IS NOT NULL THEN 1 END) = 0 THEN 0.0
                       ELSE (SUM(CASE WHEN a.isCorrect = true THEN 1.0 ELSE 0.0 END) * 100.0
                             / COUNT(CASE WHEN a.isCorrect IS NOT NULL THEN 1 END))
                   END
            FROM Attempt a
            WHERE a.userId = :userId
            """)
    Double calculateOverallAccuracyPercent(@Param("userId") UUID userId);

    @Query("""
            SELECT q.courseId AS courseId,
                   CASE
                       WHEN COUNT(CASE WHEN a.isCorrect IS NOT NULL THEN 1 END) = 0 THEN 0.0
                       ELSE (SUM(CASE WHEN a.isCorrect = true THEN 1.0 ELSE 0.0 END) * 100.0
                             / COUNT(CASE WHEN a.isCorrect IS NOT NULL THEN 1 END))
                   END AS accuracyPercent
            FROM Attempt a
            JOIN Question q ON q.id = a.questionId
            WHERE a.userId = :userId
            GROUP BY q.courseId
            """)
    List<CourseAccuracyView> calculateAccuracyByCourse(@Param("userId") UUID userId);
}

