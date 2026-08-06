package com.skillforge.auth;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Builds HMAC signing keys that satisfy JJWT's 256-bit minimum requirement.
 * Short secrets are stretched with SHA-256 so Render env values of any length work.
 */
public final class JwtSigningKeyFactory {

    private static final int MIN_KEY_BYTES = 32;

    private JwtSigningKeyFactory() {
    }

    public static SecretKey fromSecret(String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalArgumentException("JWT secret must not be blank");
        }

        byte[] secretBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (secretBytes.length >= MIN_KEY_BYTES) {
            return Keys.hmacShaKeyFor(secretBytes);
        }

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return Keys.hmacShaKeyFor(digest.digest(secretBytes));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }
}
