package com.skillforge.common;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * Verifies required sensitive environment variables at application startup.
 * Fails fast if critical secrets or datasource URL are not provided to avoid
 * running with insecure defaults.
 */
@Slf4j
@Component
public class EnvVerifier {

    @PostConstruct
    public void verify() {
        String jwtSecret = System.getenv("JWT_SECRET");
        String datasource = System.getenv("SPRING_DATASOURCE_URL");
        String adminProv = System.getenv("ADMIN_PROVISIONING_SECRET");

        if (jwtSecret == null || jwtSecret.isBlank()) {
            log.error("Missing required environment variable: JWT_SECRET");
            throw new IllegalStateException("Missing required environment variable: JWT_SECRET");
        }

        if (datasource == null || datasource.isBlank()) {
            log.error("Missing required environment variable: SPRING_DATASOURCE_URL");
            throw new IllegalStateException("Missing required environment variable: SPRING_DATASOURCE_URL");
        }

        if (adminProv == null || adminProv.isBlank()) {
            log.error("Missing required environment variable: ADMIN_PROVISIONING_SECRET");
            throw new IllegalStateException("Missing required environment variable: ADMIN_PROVISIONING_SECRET");
        }

        // Railway HTTPS enforcement check (best-effort): if running on Railway, expect FORCE_HTTPS=true
        String railway = System.getenv("RAILWAY_ENV");
        String forceHttps = System.getenv("FORCE_HTTPS");
        if (railway != null && !"true".equalsIgnoreCase(forceHttps)) {
            log.warn("Running on Railway detected (RAILWAY_ENV set) but FORCE_HTTPS!=true — ensure Railway project is configured to enforce HTTPS");
        }

        log.info("Environment verification passed: required secrets present");
    }
}
