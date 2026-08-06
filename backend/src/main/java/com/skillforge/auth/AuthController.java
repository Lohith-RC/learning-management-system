package com.skillforge.auth;

<<<<<<< HEAD
import com.skillforge.auth.dto.AuthResponse;
import com.skillforge.auth.dto.LoginRequest;
import com.skillforge.auth.dto.RefreshRequest;
import com.skillforge.auth.dto.RegisterRequest;
=======
import com.skillforge.auth.dto.*;
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
=======
import org.springframework.security.access.prepost.PreAuthorize;
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
<<<<<<< HEAD
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        AuthResponse response = authService.register(req);
=======
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.registerStudent(request);
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
<<<<<<< HEAD
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        AuthResponse response = authService.login(req);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshRequest req) {
        AuthResponse response = authService.refresh(req.refreshToken());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshRequest req) {
        authService.logout(req.refreshToken());
        return ResponseEntity.noContent().build();
=======
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/provision")
    public ResponseEntity<AuthResponse> provisionAdmin(
            @Valid @RequestBody AdminProvisionRequest request,
            @RequestHeader("X-Admin-Provision-Secret") String provisionSecret) {
        AuthResponse response = authService.provisionAdmin(request, provisionSecret);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/password-reset/request")
    public ResponseEntity<Void> requestPasswordReset(@Valid @RequestBody PasswordResetRequestMsg request) {
        authService.requestPasswordReset(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password-reset/confirm")
    public ResponseEntity<Void> confirmPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        authService.confirmPasswordReset(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/test-student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> testStudentRole() {
        return ResponseEntity.ok("Access granted: user has ROLE_STUDENT");
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
    }
}
