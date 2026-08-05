package com.skillforge.course.dto;

import com.skillforge.course.Course;

import java.time.Instant;
import java.util.UUID;

public record CourseResponse(
        UUID id,
        String title,
        String description,
        String category,
        Instant createdAt
) {
    public static CourseResponse from(Course c) {
        return new CourseResponse(c.getId(), c.getTitle(), c.getDescription(), c.getCategory(), c.getCreatedAt());
    }
}
