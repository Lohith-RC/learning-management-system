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
        String dbUrl = System.getenv("DB_URL");
        if (dbUrl == null || dbUrl.isBlank()) {
            dbUrl = System.getenv("SPRING_DATASOURCE_URL");
        }
        String dbUser = System.getenv("DB_USERNAME");
        String jwtSecret = System.getenv("JWT_SECRET");
        String port = System.getenv("PORT");

        log.info("=========================================");
        log.info(" Render Environment Verification");
        log.info(" - DB_URL: {}", (dbUrl != null && !dbUrl.isBlank() ? "PRESENT" : "MISSING (using default)"));
        log.info(" - DB_USERNAME: {}", (dbUser != null && !dbUser.isBlank() ? "PRESENT" : "MISSING (using default)"));
        log.info(" - JWT_SECRET: {}", (jwtSecret != null && !jwtSecret.isBlank() ? "PRESENT" : "MISSING (using default)"));
        log.info(" - PORT: {}", (port != null && !port.isBlank() ? port : "8080 (default)"));
        log.info("=========================================");
    }
}
