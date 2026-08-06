package com.skillforge.assessment.dto;

import java.util.UUID;

public record SubmitCodeResponse(
        UUID attemptId,
        String status,   // PENDING | PASS | FAIL
        String results,  // JSON string - per-test-case pass/fail, filled in once sandbox integration lands
        Long runtimeMs
) {
}
