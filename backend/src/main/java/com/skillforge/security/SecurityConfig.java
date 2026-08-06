package com.skillforge.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

/**
 * Backend Security & API Standards v1 (Avani):
 * - Stateless JWT auth, no server-side session.
 * - @PreAuthorize("hasRole('ADMIN')") enforced on every admin-only endpoint
 *   (see CourseController / ModuleController / ArticleController).
 *
 * TODO (Monica): implement JwtAuthenticationFilter per the security architecture
 * doc (HS256, 15 min access / 7 day rotating refresh) and register it below in
 * place of the addFilterBefore(...) placeholder. Until then all requests are
 * treated as unauthenticated, so @PreAuthorize("hasRole('ADMIN')") will reject
 * everything - that's expected until the filter is wired in.
 */
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/api-docs/**",
                                "/api/auth/**"
                        ).permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/courses").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/courses/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/courses/{courseId}/modules").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
