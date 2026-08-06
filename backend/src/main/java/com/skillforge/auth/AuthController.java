package com.skillforge.auth;

import com.skillforge.auth.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final HttpServletRequest request;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest requestBody) {
        log.info("Auth register attempt from IP={}", request.getRemoteAddr());
        AuthResponse response = authService.registerStudent(requestBody);
        log.info("Auth register succeeded for email={}", response.email());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest requestBody) {
        log.info("Auth login attempt for email={} from IP={}", requestBody.email(), request.getRemoteAddr());
        AuthResponse response = authService.login(requestBody);
        log.info("Auth login succeeded for email={}", response.email());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/provision")
    public ResponseEntity<AuthResponse> provisionAdmin(
            @Valid @RequestBody AdminProvisionRequest provisionRequest,
            @RequestHeader("X-Admin-Provision-Secret") String provisionSecret
    ) {
        log.info("Admin provisioning attempt for email={} from IP={}", provisionRequest.email(), request.getRemoteAddr());
        AuthResponse response = authService.provisionAdmin(provisionRequest, provisionSecret);
        log.info("Admin provisioned for email={}", response.email());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest requestBody) {
        log.info("Refresh token request from IP={}", request.getRemoteAddr());
        AuthResponse response = authService.refreshToken(requestBody);
        log.info("Refresh token rotated for email={}", response.email());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/password-reset/request")
    public ResponseEntity<Void> requestPasswordReset(@Valid @RequestBody PasswordResetRequestMsg requestBody) {
        log.info("Password reset requested for email={} from IP={}", requestBody.email(), request.getRemoteAddr());
        authService.requestPasswordReset(requestBody);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password-reset/confirm")
    public ResponseEntity<Void> confirmPasswordReset(@Valid @RequestBody PasswordResetRequest requestBody) {
        log.info("Password reset confirm attempt for token={} from IP={}", requestBody.token(), request.getRemoteAddr());
        authService.confirmPasswordReset(requestBody);
        log.info("Password reset confirmed for token={}", requestBody.token());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/test-student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> testStudentRole() {
        return ResponseEntity.ok("Access granted: user has ROLE_STUDENT");
    }
}
