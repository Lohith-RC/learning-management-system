package com.skillforge.course;

import com.skillforge.profile.projection.EnrolledCourseView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {
    Optional<Enrollment> findByUserIdAndCourseId(UUID userId, UUID courseId);
    List<Enrollment> findByUserId(UUID userId);

    @Query("""
            SELECT e.courseId AS courseId,
                   c.title AS courseName,
                   e.progressPercent AS progressPercent
            FROM Enrollment e
            JOIN Course c ON c.id = e.courseId
            WHERE e.userId = :userId
            ORDER BY e.enrolledAt DESC
            """)
    List<EnrolledCourseView> findEnrolledCoursesByUserId(@Param("userId") UUID userId);

    @Query("""
            SELECT COALESCE(AVG(e.progressPercent), 0.0)
            FROM Enrollment e
            WHERE e.userId = :userId
            """)
    Double calculateOverallProgressPercent(@Param("userId") UUID userId);
}
