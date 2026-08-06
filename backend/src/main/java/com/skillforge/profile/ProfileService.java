package com.skillforge.profile;

import com.skillforge.assessment.AttemptRepository;
import com.skillforge.auth.UserRepository;
import com.skillforge.common.AccessDeniedExceptionCustom;
import com.skillforge.course.EnrollmentRepository;
import com.skillforge.course.ModuleRepository;
import com.skillforge.profile.dto.CourseProgressDTO;
import com.skillforge.profile.dto.ModuleCompletionDetailDTO;
import com.skillforge.profile.dto.ProfileResponse;
import com.skillforge.profile.projection.CourseAccuracyView;
import com.skillforge.profile.projection.EnrolledCourseView;
import com.skillforge.profile.projection.ModuleCompletionView;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfileService {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AttemptRepository attemptRepository;
    private final ModuleRepository moduleRepository;

    /**
     * Builds the profile for {@code studentId}, enforcing that the caller may only
     * read their own profile.
     */
    public ProfileResponse getProfile(UUID studentId, UUID requestingUserId) {
        verifyOwnership(studentId, requestingUserId);

        double overallProgress = roundPercent(
                enrollmentRepository.calculateOverallProgressPercent(studentId));
        double overallAccuracy = roundPercent(
                attemptRepository.calculateOverallAccuracyPercent(studentId));

        Map<UUID, Double> accuracyByCourse = attemptRepository.calculateAccuracyByCourse(studentId).stream()
                .collect(Collectors.toMap(
                        CourseAccuracyView::getCourseId,
                        view -> roundPercent(view.getAccuracyPercent())
                ));

        List<CourseProgressDTO> courses = enrollmentRepository.findEnrolledCoursesByUserId(studentId).stream()
                .map(enrollment -> toCourseProgress(enrollment, accuracyByCourse, studentId))
                .toList();

        return new ProfileResponse(
                studentId,
                overallProgress,
                overallAccuracy,
                courses
        );
    }

    private CourseProgressDTO toCourseProgress(
            EnrolledCourseView enrollment,
            Map<UUID, Double> accuracyByCourse,
            UUID studentId
    ) {
        UUID courseId = enrollment.getCourseId();
        double progressPercent = roundPercent(enrollment.getProgressPercent());
        double testAccuracyPercent = accuracyByCourse.getOrDefault(courseId, 0.0);

        List<ModuleCompletionDetailDTO> moduleDetails =
                moduleRepository.findModuleCompletionByCourseIdAndUserId(courseId, studentId).stream()
                        .map(this::toModuleCompletionDetail)
                        .toList();

        return new CourseProgressDTO(
                courseId,
                enrollment.getCourseName(),
                progressPercent,
                testAccuracyPercent,
                moduleDetails
        );
    }

    private ModuleCompletionDetailDTO toModuleCompletionDetail(ModuleCompletionView view) {
        long total = view.getTotalArticles() != null ? view.getTotalArticles() : 0L;
        long read = view.getReadArticles() != null ? view.getReadArticles() : 0L;
        double moduleProgress = total == 0 ? 0.0 : roundPercent((read * 100.0) / total);

        return new ModuleCompletionDetailDTO(
                view.getModuleId(),
                view.getModuleTitle(),
                (int) total,
                (int) read,
                moduleProgress
        );
    }

    private void verifyOwnership(UUID studentId, UUID requestingUserId) {
        if (!studentId.equals(requestingUserId)) {
            throw new AccessDeniedExceptionCustom("You can only access your own profile");
        }
        if (!userRepository.existsById(studentId)) {
            throw new EntityNotFoundException("User not found: " + studentId);
        }
    }

    private static double roundPercent(Double value) {
        if (value == null || Double.isNaN(value)) {
            return 0.0;
        }
        return Math.round(value * 100.0) / 100.0;
    }
}
