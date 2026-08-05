package com.skillforge.course.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ArticleRequest(
        @NotBlank @Size(max = 200) String title,
        @NotBlank(message = "content is required") String content,
        @Min(0) Integer orderIndex
) {
}
