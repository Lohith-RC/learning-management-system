package com.skillforge.streak;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Repository exposing activity-aggregation queries used by the streak calendar.
 */
public interface StreakActivityRepository extends JpaRepository<com.skillforge.assessment.Attempt, UUID> {

    @Query(value = "SELECT CAST(a.attempted_at AS date) AS day, COUNT(*) AS cnt \n" +
            "FROM attempt a \n" +
            "WHERE a.user_id = :userId AND a.attempted_at >= :start AND a.attempted_at < :end \n" +
            "GROUP BY day ORDER BY day",
            nativeQuery = true)
    List<DateCountProjection> countAttemptsGroupedByDay(
            @Param("userId") UUID userId,
            @Param("start") Instant start,
            @Param("end") Instant end
    );

    @Query(value = "SELECT CAST(sub.day AS date) AS day, COUNT(*) AS cnt FROM (\n" +
            "  SELECT e.course_id, MAX(ap.read_at) AS day\n" +
            "  FROM enrollment e\n" +
            "  JOIN module m ON m.course_id = e.course_id\n" +
            "  JOIN article a ON a.module_id = m.id\n" +
            "  JOIN article_progress ap ON ap.article_id = a.id AND ap.user_id = e.user_id\n" +
            "  WHERE e.user_id = :userId AND e.progress_percent >= 100 AND ap.read_at >= :start AND ap.read_at < :end\n" +
            "  GROUP BY e.course_id\n" +
            ") sub\n" +
            "GROUP BY day ORDER BY day",
            nativeQuery = true)
    List<DateCountProjection> countCourseCompletionsGroupedByDay(
            @Param("userId") UUID userId,
            @Param("start") Instant start,
            @Param("end") Instant end
    );
}
