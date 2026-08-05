package com.skillforge.course.dto;

import com.skillforge.course.Article;

import java.util.UUID;

public record ArticleResponse(UUID id, UUID moduleId, String title, String content, Integer orderIndex, boolean read) {
    public static ArticleResponse from(Article a, boolean read) {
        return new ArticleResponse(a.getId(), a.getModuleId(), a.getTitle(), a.getContent(), a.getOrderIndex(), read);
    }
}
