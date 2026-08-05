package com.skillforge.course.dto;

import com.skillforge.course.Module;

import java.util.UUID;

public record ModuleResponse(UUID id, UUID courseId, String title, Integer orderIndex) {
    public static ModuleResponse from(Module m) {
        return new ModuleResponse(m.getId(), m.getCourseId(), m.getTitle(), m.getOrderIndex());
    }
}
