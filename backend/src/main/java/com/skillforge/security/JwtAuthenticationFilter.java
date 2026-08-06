package com.skillforge.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7).trim();
            try {
                Claims claims = parseClaims(token);
                Authentication authentication = buildAuthentication(claims, request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception ex) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Authentication buildAuthentication(Claims claims, HttpServletRequest request) {
        UUID userId = resolveUserId(claims);
        List<GrantedAuthority> authorities = resolveAuthorities(claims);

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userId, null, authorities);
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authentication;
    }

    private UUID resolveUserId(Claims claims) {
        String subject = claims.getSubject();
        if (subject != null && !subject.isBlank()) {
            return UUID.fromString(subject);
        }

        Object directUserId = claims.get("user_id");
        if (directUserId instanceof String rawUserId) {
            return UUID.fromString(rawUserId);
        }

        Object userIdClaim = claims.get("userId");
        if (userIdClaim instanceof String rawUserId) {
            return UUID.fromString(rawUserId);
        }

        throw new IllegalArgumentException("JWT missing subject user id");
    }

    private List<GrantedAuthority> resolveAuthorities(Claims claims) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        String role = firstNonBlank(
                asString(claims.get("role")),
                asString(claims.get("user_role")),
                extractNestedRole(claims)
        );

        if (role != null) {
            String roleUpper = role.toUpperCase();
            if (roleUpper.startsWith("ROLE_")) {
                authorities.add(new SimpleGrantedAuthority(roleUpper));
            } else {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + roleUpper));
            }
        }

        return authorities;
    }

    private String extractNestedRole(Claims claims) {
        Object appMetadata = claims.get("app_metadata");
        if (appMetadata instanceof Map<?, ?> metadata) {
            Object role = metadata.get("role");
            if (role instanceof String nextRole) {
                return nextRole;
            }
        }

        Object userMetadata = claims.get("user_metadata");
        if (userMetadata instanceof Map<?, ?> metadata) {
            Object role = metadata.get("role");
            if (role instanceof String nextRole) {
                return nextRole;
            }
        }

        return null;
    }

    private String asString(Object value) {
        return value instanceof String raw ? raw : null;
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }
}
