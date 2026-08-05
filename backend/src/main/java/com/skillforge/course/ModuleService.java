package com.skillforge.course;

import com.skillforge.course.dto.ModuleRequest;
import com.skillforge.course.dto.ModuleResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final CourseRepository courseRepository;

    public List<ModuleResponse> listByCourse(UUID courseId) {
        return moduleRepository.findByCourseIdOrderByOrderIndexAsc(courseId)
                .stream().map(ModuleResponse::from).toList();
    }

    public ModuleResponse create(UUID courseId, ModuleRequest req) {
        if (!courseRepository.existsById(courseId)) {
            throw new EntityNotFoundException("Course not found: " + courseId);
        }
        Module m = new Module();
        m.setCourseId(courseId);
        m.setTitle(req.title());
        m.setOrderIndex(req.orderIndex() != null ? req.orderIndex() : 0);
        return ModuleResponse.from(moduleRepository.save(m));
    }

    public ModuleResponse update(UUID moduleId, ModuleRequest req) {
        Module m = findOrThrow(moduleId);
        m.setTitle(req.title());
        if (req.orderIndex() != null) m.setOrderIndex(req.orderIndex());
        return ModuleResponse.from(moduleRepository.save(m));
    }

    public void delete(UUID moduleId) {
        if (!moduleRepository.existsById(moduleId)) {
            throw new EntityNotFoundException("Module not found: " + moduleId);
        }
        moduleRepository.deleteById(moduleId);
    }

    private Module findOrThrow(UUID id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Module not found: " + id));
    }
}
