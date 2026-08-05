package com.skillforge.course;

import com.skillforge.common.ContentSanitizer;
import com.skillforge.course.dto.ArticleRequest;
import com.skillforge.course.dto.ArticleResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ModuleRepository moduleRepository;
    private final ArticleProgressRepository articleProgressRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ContentSanitizer sanitizer;

    public List<ArticleResponse> listByModule(UUID moduleId, UUID requestingUserId) {
        return articleRepository.findByModuleIdOrderByOrderIndexAsc(moduleId).stream()
                .map(a -> ArticleResponse.from(a, isRead(requestingUserId, a.getId())))
                .toList();
    }

    public ArticleResponse create(UUID moduleId, ArticleRequest req) {
        if (!moduleRepository.existsById(moduleId)) {
            throw new EntityNotFoundException("Module not found: " + moduleId);
        }
        Article a = new Article();
        a.setModuleId(moduleId);
        a.setTitle(req.title());
        a.setContent(sanitizer.sanitize(req.content())); // XSS defense on write
        a.setOrderIndex(req.orderIndex() != null ? req.orderIndex() : 0);
        Article saved = articleRepository.save(a);
        return ArticleResponse.from(saved, false);
    }

    public ArticleResponse update(UUID articleId, ArticleRequest req, UUID requestingUserId) {
        Article a = findOrThrow(articleId);
        a.setTitle(req.title());
        a.setContent(sanitizer.sanitize(req.content()));
        if (req.orderIndex() != null) a.setOrderIndex(req.orderIndex());
        Article saved = articleRepository.save(a);
        return ArticleResponse.from(saved, isRead(requestingUserId, articleId));
    }

    public void delete(UUID articleId) {
        if (!articleRepository.existsById(articleId)) {
            throw new EntityNotFoundException("Article not found: " + articleId);
        }
        articleRepository.deleteById(articleId);
    }

    /**
     * FR-2.3: mark an article read, then recompute progress_percent on the
     * relevant Enrollment (read articles / total articles in the course).
     */
    public void markRead(UUID articleId, UUID userId) {
        Article article = findOrThrow(articleId);

        articleProgressRepository.findByUserIdAndArticleId(userId, articleId)
                .orElseGet(() -> {
                    ArticleProgress progress = new ArticleProgress();
                    progress.setUserId(userId);
                    progress.setArticleId(articleId);
                    return articleProgressRepository.save(progress);
                });

        Module module = moduleRepository.findById(article.getModuleId())
                .orElseThrow(() -> new EntityNotFoundException("Module not found: " + article.getModuleId()));

        recalculateProgress(userId, module.getCourseId());
    }

    private void recalculateProgress(UUID userId, UUID courseId) {
        List<Module> modules = moduleRepository.findByCourseIdOrderByOrderIndexAsc(courseId);
        int totalArticles = 0;
        int readArticles = 0;

        for (Module m : modules) {
            List<Article> articles = articleRepository.findByModuleIdOrderByOrderIndexAsc(m.getId());
            totalArticles += articles.size();
            for (Article a : articles) {
                if (isRead(userId, a.getId())) readArticles++;
            }
        }

        double percent = totalArticles == 0 ? 0.0 : (readArticles * 100.0) / totalArticles;

        enrollmentRepository.findByUserIdAndCourseId(userId, courseId).ifPresent(enrollment -> {
            enrollment.setProgressPercent(percent);
            enrollmentRepository.save(enrollment);
        });
    }

    private boolean isRead(UUID userId, UUID articleId) {
        return articleProgressRepository.findByUserIdAndArticleId(userId, articleId).isPresent();
    }

    private Article findOrThrow(UUID id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found: " + id));
    }
}
