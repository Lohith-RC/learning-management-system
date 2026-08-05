package com.skillforge.assessment;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    List<Question> findByCourseId(UUID courseId);
    List<Question> findByCourseIdAndTopicAndDifficulty(UUID courseId, String topic, Difficulty difficulty);
    List<Question> findByCourseIdAndTopic(UUID courseId, String topic);
}

