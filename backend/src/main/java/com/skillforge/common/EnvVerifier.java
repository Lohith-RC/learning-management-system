package com.skillforge.common;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * Verifies required sensitive environment variables at application startup.
 * Logs clear diagnostic messages if environment variables are missing.
 */
@Slf4j
@Component
public class EnvVerifier {

    @PostConstruct
    public void verify() {
        String jwtSecret = System.getenv("JWT_SECRET");
        String datasource = System.getenv("SPRING_DATASOURCE_URL");
        if (datasource == null || datasource.isBlank()) {
            datasource = System.getenv("DB_URL");
        }
        String adminProv = System.getenv("ADMIN_PROVISIONING_SECRET");

        if (jwtSecret == null || jwtSecret.isBlank()) {
            log.warn("JWT_SECRET is not set in environment — using default fallback secret. Please set JWT_SECRET in production.");
        }

        if (datasource == null || datasource.isBlank()) {
            log.warn("DB_URL / SPRING_DATASOURCE_URL is not set in environment — using default fallback URL.");
        }

        if (adminProv == null || adminProv.isBlank()) {
            log.warn("ADMIN_PROVISIONING_SECRET is not set in environment — falling back to default secret key.");
        }

        log.info("Environment verification check complete.");
    }
}
