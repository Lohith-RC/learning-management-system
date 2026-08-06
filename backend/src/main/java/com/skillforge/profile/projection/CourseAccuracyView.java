package com.skillforge.profile.projection;

import java.util.UUID;

/**
 * Spring Data projection for per-course assessment accuracy aggregates.
 */
public interface CourseAccuracyView {
    UUID getCourseId();

    Double getAccuracyPercent();
}
