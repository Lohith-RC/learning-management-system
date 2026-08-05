package com.skillforge.course;

import com.skillforge.common.CurrentUser;
import com.skillforge.course.dto.EnrollmentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final CurrentUser currentUser;

    // FR-2.3 - register (enroll) for a course
    @PostMapping("/courses/{courseId}/enroll")
    public ResponseEntity<EnrollmentResponse> enroll(@PathVariable UUID courseId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enrollmentService.enroll(currentUser.id(), courseId));
    }

    @GetMapping("/me/enrollments")
    public List<EnrollmentResponse> myEnrollments() {
        return enrollmentService.listForUser(currentUser.id());
    }
}
