package com.skillforge.assessment;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AttemptRepository extends JpaRepository<Attempt, UUID> {
    List<Attempt> findByUserIdAndQuestionId(UUID userId, UUID questionId);
    List<Attempt> findByUserId(UUID userId);
}

