package com.skillforge.course;

import com.skillforge.course.dto.CourseRequest;
import com.skillforge.course.dto.CourseResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;

    public List<CourseResponse> listAll() {
        return courseRepository.findAll().stream().map(CourseResponse::from).toList();
    }

    public CourseResponse getById(UUID id) {
        return CourseResponse.from(findOrThrow(id));
    }

    public CourseResponse create(CourseRequest req, UUID createdByUserId) {
        Course c = new Course();
        c.setTitle(req.title());
        c.setDescription(req.description());
        c.setCategory(req.category());
        c.setCreatedBy(createdByUserId);
        return CourseResponse.from(courseRepository.save(c));
    }

    public CourseResponse update(UUID id, CourseRequest req) {
        Course c = findOrThrow(id);
        c.setTitle(req.title());
        c.setDescription(req.description());
        c.setCategory(req.category());
        return CourseResponse.from(courseRepository.save(c));
    }

    public void delete(UUID id) {
        if (!courseRepository.existsById(id)) {
            throw new EntityNotFoundException("Course not found: " + id);
        }
        courseRepository.deleteById(id);
    }

    private Course findOrThrow(UUID id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found: " + id));
    }
}
