package com.skillforge.common;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * Verifies required environment variables at application startup
 * and prints a clean diagnostic summary to logs.
 */
@Slf4j
@Component
public class EnvVerifier {

    @PostConstruct
    public void verify() {
        String dbUrl = firstNonBlank(System.getenv("DB_URL"), System.getenv("SPRING_DATASOURCE_URL"));
        String dbUser = firstNonBlank(System.getenv("DB_USERNAME"), System.getenv("SPRING_DATASOURCE_USERNAME"));
        String dbPassword = firstNonBlank(System.getenv("DB_PASSWORD"), System.getenv("SPRING_DATASOURCE_PASSWORD"));
        String jwtSecret = System.getenv("JWT_SECRET");
        String port = System.getenv("PORT");
        boolean onRender = "true".equalsIgnoreCase(System.getenv("RENDER"));

        log.info("=========================================");
        log.info(" Environment Verification");
        log.info(" - DB_URL: {}", status(dbUrl));
        log.info(" - DB_USERNAME: {}", status(dbUser));
        log.info(" - DB_PASSWORD: {}", status(dbPassword));
        log.info(" - JWT_SECRET: {}", status(jwtSecret));
        log.info(" - PORT: {}", (port != null && !port.isBlank() ? port : "8080 (default)"));

        if (dbUrl != null && !dbUrl.startsWith("jdbc:postgresql://") && !dbUrl.startsWith("postgres")) {
            log.warn(" - DB_URL format: will be normalized to JDBC (postgresql:// or jdbc:postgresql:// expected)");
        }

        if (onRender) {
            validateRequired("DB_URL", dbUrl);
            validateRequired("DB_USERNAME", dbUser);
            validateRequired("DB_PASSWORD", dbPassword);
            validateRequired("JWT_SECRET", jwtSecret);
        }

        log.info("=========================================");
    }

    private static String firstNonBlank(String primary, String fallback) {
        if (primary != null && !primary.isBlank()) {
            return primary.trim();
        }
        if (fallback != null && !fallback.isBlank()) {
            return fallback.trim();
        }
        return null;
    }

    private static String status(String value) {
        return (value != null && !value.isBlank()) ? "PRESENT" : "MISSING (using default)";
    }

    private static void validateRequired(String name, String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Missing required Render environment variable: " + name);
        }
    }
}
