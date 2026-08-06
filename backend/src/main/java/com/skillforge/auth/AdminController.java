package com.skillforge.auth;

import com.skillforge.auth.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<Page<UserResponse>> listStudents(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<UserResponse> response = adminService.listStudents(query, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{id}/progress")
    public ResponseEntity<UserProgressResponse> getUserProgress(@PathVariable UUID id) {
        UserProgressResponse response = adminService.getUserProgress(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<UserResponse> updateUserStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UserStatusUpdateRequest request
    ) {
        UserResponse response = adminService.updateUserStatus(id, request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}/password-reset")
    public ResponseEntity<UserResponse> resetUserPassword(
            @PathVariable UUID id,
            @Valid @RequestBody PasswordResetRequest request
    ) {
        UserResponse response = adminService.resetUserPassword(id, request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}/promote")
    public ResponseEntity<UserResponse> promoteToAdmin(@PathVariable UUID id) {
        UserResponse response = adminService.promoteToAdmin(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> handleImageUpload(@RequestParam("file") MultipartFile file) {
        // Return a mock path for rich-text image insertion
        String fileName = file.getOriginalFilename();
        String mockUrl = "/images/" + (fileName != null ? fileName : "uploaded_image.png");
        return ResponseEntity.ok(Map.of("url", mockUrl));
    }
}
