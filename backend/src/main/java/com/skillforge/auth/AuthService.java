package com.skillforge.auth;

import com.skillforge.auth.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Authentication service with safe defaults:
 * - No hardcoded admin provisioning secret (must come from env/property)
 * - Audit logging for important events
 * - Secure refresh token rotation
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${admin.provisioning.secret}")
    private String adminProvisioningSecret; // required - no default allowed

    @Value("${jwt.refresh-token-expiry-days:7}")
    private long refreshTokenExpiryDays;

    @Transactional
    public AuthResponse registerStudent(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email is already registered: " + request.email());
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .role(Role.ROLE_STUDENT)
                .status(UserStatus.ACTIVE)
                .build();

        user = userRepository.save(user);
        log.info("Student registered successfully: {}", user.getEmail());

        return issueTokens(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new UnauthorizedException("Account is " + user.getStatus().name().toLowerCase());
        }

        log.info("User logged in successfully: {}", user.getEmail());
        return issueTokens(user);
    }

    @Transactional
    public AuthResponse provisionAdmin(AdminProvisionRequest request, String headerSecret) {
        if (headerSecret == null || !headerSecret.equals(adminProvisioningSecret)) {
            throw new UnauthorizedException("Invalid or missing admin provisioning secret");
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email is already registered: " + request.email());
        }

        User admin = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .role(Role.ROLE_ADMIN)
                .status(UserStatus.ACTIVE)
                .build();

        admin = userRepository.save(admin);
        log.info("Admin provisioned successfully: {}", admin.getEmail());

        return issueTokens(admin);
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String rawToken = request.refreshToken();

        if (!jwtTokenProvider.validateToken(rawToken)) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        String tokenHash = jwtTokenProvider.hashToken(rawToken);
        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new UnauthorizedException("Refresh token not found"));

        if (storedToken.isRevoked()) {
            throw new UnauthorizedException("Refresh token has been revoked");
        }

        if (storedToken.getExpiryDate().isBefore(Instant.now())) {
            throw new UnauthorizedException("Refresh token has expired");
        }

        // Revoke old token (rotation)
        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        User user = storedToken.getUser();
        log.info("Refresh token rotated for user: {}", user.getEmail());

        return issueTokens(user);
    }

    @Transactional
    public void requestPasswordReset(PasswordResetRequestMsg request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("Email not found: " + request.email()));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        // Stub dev email dispatch to console (do NOT log sensitive tokens in production)
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        log.info("--- [DEV-MODE EMAIL LINK STUB] ---");
        log.info("To: {}", user.getEmail());
        log.info("Password Reset Link: {}", resetLink);
        log.info("----------------------------------");
    }

    @Transactional
    public void confirmPasswordReset(PasswordResetRequest request) {
        User user = userRepository.findByResetToken(request.token())
                .orElseThrow(() -> new BadRequestException("Invalid or expired password reset token"));

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Password reset token has expired");
        }

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
        log.info("Password reset successfully for user: {}", user.getEmail());
    }

    private AuthResponse issueTokens(User user) {
        String accessToken = jwtTokenProvider.generateAccessToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        // Persist hashed refresh token for rotation
        createRefreshTokenEntity(user, refreshToken);

        return AuthResponse.fromUser(user, accessToken, refreshToken,
                jwtTokenProvider.getJwtExpirationInMs());
    }

    private void createRefreshTokenEntity(User user, String rawToken) {
        RefreshToken tokenEntity = RefreshToken.builder()
                .user(user)
                .tokenHash(jwtTokenProvider.hashToken(rawToken))
                .expiryDate(Instant.now().plusSeconds(refreshTokenExpiryDays * 24 * 60 * 60))
                .revoked(false)
                .build();

        refreshTokenRepository.save(tokenEntity);
    }
}
