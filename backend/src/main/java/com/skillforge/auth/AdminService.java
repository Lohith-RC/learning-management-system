package com.skillforge.auth;

import com.skillforge.assessment.Attempt;
import com.skillforge.assessment.AttemptRepository;
import com.skillforge.assessment.Question;
import com.skillforge.assessment.QuestionRepository;
import com.skillforge.auth.dto.*;
import com.skillforge.course.Course;
import com.skillforge.course.CourseRepository;
import com.skillforge.course.Enrollment;
import com.skillforge.course.EnrollmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AttemptRepository attemptRepository;
    private final CourseRepository courseRepository;
    private final QuestionRepository questionRepository;
    private final PasswordEncoder passwordEncoder;

    public Page<UserResponse> listStudents(String query, UserStatus status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<User> users = userRepository.searchStudents(Role.ROLE_STUDENT, query, status, pageable);
        return users.map(UserResponse::fromUser);
    }

    @Transactional
    public UserResponse updateUserStatus(UUID userId, UserStatusUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));

        user.setStatus(request.status());
        user = userRepository.save(user);
        log.info("Admin updated user {} status to: {}", userId, request.status());
        return UserResponse.fromUser(user);
    }

    @Transactional
    public UserResponse resetUserPassword(UUID userId, PasswordResetRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        user = userRepository.save(user);
        log.info("Admin reset password for user: {}", user.getEmail());
        return UserResponse.fromUser(user);
    }

    @Transactional
    public UserResponse promoteToAdmin(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));

        if (user.getRole() == Role.ROLE_ADMIN) {
            throw new BadRequestException("User is already an admin: " + user.getEmail());
        }

        user.setRole(Role.ROLE_ADMIN);
        user = userRepository.save(user);
        log.info("User promoted to ADMIN: {}", user.getEmail());
        return UserResponse.fromUser(user);
    }

    public UserProgressResponse getUserProgress(UUID userId) {
        // Verify user exists
        if (!userRepository.existsById(userId)) {
            throw new EntityNotFoundException("User not found: " + userId);
        }

        // Fetch enrollments
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        List<CourseProgressDto> courseProgressList = new ArrayList<>();
        for (Enrollment enrollment : enrollments) {
            String courseName = courseRepository.findById(enrollment.getCourseId())
                    .map(Course::getTitle)
                    .orElse("Unknown Course");
            courseProgressList.add(new CourseProgressDto(
                    enrollment.getCourseId(),
                    courseName,
                    enrollment.getProgressPercent(),
                    enrollment.getEnrolledAt()
            ));
        }

        // Fetch attempts
        List<Attempt> attempts = attemptRepository.findByUserId(userId);
        List<AssessmentAttemptDto> attemptList = new ArrayList<>();
        for (Attempt attempt : attempts) {
            Question question = questionRepository.findById(attempt.getQuestionId()).orElse(null);
            String title = (question != null) ? question.getContent() : "Unknown Question";
            if (title.length() > 50) {
                title = title.substring(0, 47) + "...";
            }
            String type = (question != null) ? question.getType().name() : "MCQ";
            attemptList.add(new AssessmentAttemptDto(
                    attempt.getId(),
                    attempt.getQuestionId(),
                    title,
                    type,
                    attempt.getIsCorrect(),
                    attempt.getScore(),
                    attempt.getAttemptedAt()
            ));
        }

        return new UserProgressResponse(courseProgressList, attemptList);
    }
}
