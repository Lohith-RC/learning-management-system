package com.skillforge.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

/**
 * Applies Render environment variable names ({@code DB_URL}, {@code DB_USERNAME},
 * {@code DB_PASSWORD}) to Spring datasource properties before auto-configuration runs.
 */
public class DatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private static final String PROPERTY_SOURCE = "renderDatabaseConfig";

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Map<String, Object> properties = new HashMap<>();

        String dbUrl = firstNonBlank(
                environment.getProperty("DB_URL"),
                environment.getProperty("SPRING_DATASOURCE_URL")
        );
        if (dbUrl != null) {
            properties.put("spring.datasource.url", DatabaseUrlNormalizer.normalize(dbUrl));
        }

        String dbUsername = firstNonBlank(
                environment.getProperty("DB_USERNAME"),
                environment.getProperty("SPRING_DATASOURCE_USERNAME")
        );
        if (dbUsername != null) {
            properties.put("spring.datasource.username", dbUsername);
        }

        String dbPassword = firstNonBlank(
                environment.getProperty("DB_PASSWORD"),
                environment.getProperty("SPRING_DATASOURCE_PASSWORD")
        );
        if (dbPassword != null) {
            properties.put("spring.datasource.password", dbPassword);
        }

        String port = environment.getProperty("PORT");
        if (port != null && !port.isBlank()) {
            properties.put("server.port", port);
        }

        String jwtSecret = environment.getProperty("JWT_SECRET");
        if (jwtSecret != null && !jwtSecret.isBlank()) {
            properties.put("jwt.secret", jwtSecret);
        }

        if (!properties.isEmpty()) {
            environment.getPropertySources().addFirst(new MapPropertySource(PROPERTY_SOURCE, properties));
        }
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
}
