package com.skillforge.profile.projection;

import java.util.UUID;

/**
 * Spring Data projection for module-level article read counts.
 */
public interface ModuleCompletionView {
    UUID getModuleId();

    String getModuleTitle();

    Long getTotalArticles();

    Long getReadArticles();
}
