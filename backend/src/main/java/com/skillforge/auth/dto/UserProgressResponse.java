package com.skillforge.auth.dto;

import java.util.List;

public record UserProgressResponse(
        List<CourseProgressDto> courses,
        List<AssessmentAttemptDto> assessments
) {}
