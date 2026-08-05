package com.skillforge.assessment;

import org.springframework.stereotype.Component;

/**
 * Abstraction over the actual code-execution sandbox (provider TBD - see PRD
 * section 10.1 assumptions). Swapping in a real provider later only means
 * implementing this interface differently; nothing in the controller/service
 * layer needs to change.
 */
public interface CodeExecutionClient {
    CodeExecutionResult execute(String code, String language, String testCasesJson);

    record CodeExecutionResult(String status, String resultsJson, long runtimeMs) {
    }
}

/**
 * Temporary stub implementation - always returns PENDING. Replace with a real
 * sandbox call once a provider is selected.
 */
@Component
class StubCodeExecutionClient implements CodeExecutionClient {
    @Override
    public CodeExecutionResult execute(String code, String language, String testCasesJson) {
        return new CodeExecutionResult("PENDING", "[]", 0L);
    }
}

