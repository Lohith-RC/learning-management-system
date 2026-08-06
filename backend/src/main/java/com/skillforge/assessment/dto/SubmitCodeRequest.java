package com.skillforge.assessment.dto;

import jakarta.validation.constraints.NotBlank;

public record SubmitCodeRequest(
        @NotBlank String code,
        @NotBlank String language
) {
}
