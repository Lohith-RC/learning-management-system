package com.skillforge.course;

import com.skillforge.common.CurrentUser;
import com.skillforge.course.dto.ArticleRequest;
import com.skillforge.course.dto.ArticleResponse;
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
public class ArticleController {

    private final ArticleService articleService;
    private final CurrentUser currentUser;

    @GetMapping("/api/modules/{moduleId}/articles")
    public List<ArticleResponse> list(@PathVariable UUID moduleId) {
        return articleService.listByModule(moduleId, currentUser.id());
    }

    @PostMapping("/api/modules/{moduleId}/articles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponse> create(@PathVariable UUID moduleId, @Valid @RequestBody ArticleRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(articleService.create(moduleId, req));
    }

    @PutMapping("/api/articles/{articleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ArticleResponse update(@PathVariable UUID articleId, @Valid @RequestBody ArticleRequest req) {
        return articleService.update(articleId, req, currentUser.id());
    }

    @DeleteMapping("/api/articles/{articleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID articleId) {
        articleService.delete(articleId);
        return ResponseEntity.noContent().build();
    }

    // FR-2.3 - mark read + recompute enrollment progress
    @PatchMapping("/api/articles/{articleId}/read")
    public ResponseEntity<Void> markRead(@PathVariable UUID articleId) {
        articleService.markRead(articleId, currentUser.id());
        return ResponseEntity.noContent().build();
    }
}
