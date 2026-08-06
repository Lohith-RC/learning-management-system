package com.skillforge.config;

/**
 * Normalizes database URLs for Render and other cloud PostgreSQL providers.
 * Accepts both JDBC and standard {@code postgresql://} connection strings.
 */
public final class DatabaseUrlNormalizer {

    private DatabaseUrlNormalizer() {
    }

    public static String normalize(String url) {
        if (url == null || url.isBlank()) {
            return url;
        }

        String normalized = url.trim();

        if (normalized.startsWith("postgres://")) {
            normalized = "jdbc:postgresql://" + normalized.substring("postgres://".length());
        } else if (normalized.startsWith("postgresql://")) {
            normalized = "jdbc:" + normalized;
        }

        if (requiresSsl(normalized) && !normalized.contains("sslmode=")) {
            normalized += normalized.contains("?") ? "&sslmode=require" : "?sslmode=require";
        }

        return normalized;
    }

    private static boolean requiresSsl(String jdbcUrl) {
        return jdbcUrl.contains(".render.com")
                || jdbcUrl.contains("amazonaws.com")
                || jdbcUrl.contains("supabase.co");
    }
}
