package com.skillforge.course.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CourseRequest(
        @NotBlank(message = "title is required") @Size(max = 200) String title,
        @Size(max = 5000) String description,
        @Size(max = 100) String category
) {
}
