package com.skillforge.course.dto;

import com.skillforge.course.Enrollment;

import java.time.Instant;
import java.util.UUID;

public record EnrollmentResponse(UUID id, UUID courseId, Instant enrolledAt, Double progressPercent) {
    public static EnrollmentResponse from(Enrollment e) {
        return new EnrollmentResponse(e.getId(), e.getCourseId(), e.getEnrolledAt(), e.getProgressPercent());
    }
}
