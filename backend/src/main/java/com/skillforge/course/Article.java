package com.skillforge.course;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "article")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "module_id", nullable = false)
    private UUID moduleId;

    @Column(nullable = false)
    private String title;

    // Sanitized HTML/rich-text content - sanitized in the service layer before persist.
    @Column(columnDefinition = "text")
    private String content;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}
