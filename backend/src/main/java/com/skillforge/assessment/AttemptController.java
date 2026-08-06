package com.skillforge.assessment;

import com.skillforge.common.CurrentUser;
import com.skillforge.assessment.dto.SubmitAnswerRequest;
import com.skillforge.assessment.dto.SubmitAnswerResponse;
import com.skillforge.assessment.dto.SubmitCodeRequest;
import com.skillforge.assessment.dto.SubmitCodeResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;
    private final CurrentUser currentUser;

    // FR-3.5 - MCQ (and descriptive, unscored) submission
    @PostMapping("/{id}/submit")
    public SubmitAnswerResponse submitAnswer(@PathVariable UUID id, @Valid @RequestBody SubmitAnswerRequest req) {
        return attemptService.submitAnswer(id, currentUser.id(), req);
    }

    // FR-3.4 - coding submission
    @PostMapping("/{id}/submit-code")
    public SubmitCodeResponse submitCode(@PathVariable UUID id, @Valid @RequestBody SubmitCodeRequest req) {
        return attemptService.submitCode(id, currentUser.id(), req);
    }
}
