package com.skillforge.course;

import com.skillforge.course.dto.EnrollmentResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentResponse enroll(UUID userId, UUID courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new EntityNotFoundException("Course not found: " + courseId);
        }
        Enrollment existing = enrollmentRepository.findByUserIdAndCourseId(userId, courseId).orElse(null);
        if (existing != null) {
            return EnrollmentResponse.from(existing); // idempotent - already enrolled
        }
        Enrollment e = new Enrollment();
        e.setUserId(userId);
        e.setCourseId(courseId);
        return EnrollmentResponse.from(enrollmentRepository.save(e));
    }

    public List<EnrollmentResponse> listForUser(UUID userId) {
        return enrollmentRepository.findByUserId(userId).stream()
                .map(EnrollmentResponse::from)
                .toList();
    }
}
