package com.skillforge.profile.projection;

import java.util.UUID;

/**
 * Spring Data projection for enrolled courses joined with course metadata.
 */
public interface EnrolledCourseView {
    UUID getCourseId();

    String getCourseName();

    Double getProgressPercent();
}
