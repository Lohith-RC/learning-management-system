package com.skillforge.course;

import com.skillforge.course.dto.ModuleRequest;
import com.skillforge.course.dto.ModuleResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class ModuleController {

    private final ModuleService moduleService;

    @GetMapping("/api/courses/{courseId}/modules")
    public List<ModuleResponse> list(@PathVariable UUID courseId) {
        return moduleService.listByCourse(courseId);
    }

    @PostMapping("/api/courses/{courseId}/modules")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ModuleResponse> create(@PathVariable UUID courseId, @Valid @RequestBody ModuleRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(moduleService.create(courseId, req));
    }

    @PutMapping("/api/modules/{moduleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ModuleResponse update(@PathVariable UUID moduleId, @Valid @RequestBody ModuleRequest req) {
        return moduleService.update(moduleId, req);
    }

    @DeleteMapping("/api/modules/{moduleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID moduleId) {
        moduleService.delete(moduleId);
        return ResponseEntity.noContent().build();
    }
}
