package com.skillforge.auth;

<<<<<<< HEAD
import com.skillforge.auth.dto.AuthResponse;
import com.skillforge.auth.dto.LoginRequest;
import com.skillforge.auth.dto.RegisterRequest;
import com.skillforge.security.JwtTokenProvider;
import com.skillforge.user.User;
import com.skillforge.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
=======
import com.skillforge.auth.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

<<<<<<< HEAD
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
@Transactional
=======
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

<<<<<<< HEAD
    @Value("${refresh-token-expiry-seconds:604800}")
    private long refreshTokenExpirySeconds;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setEmail(req.email());
        user.setPasswordHash(passwordEncoder.encode(req.password()));
        user.setFullName(req.fullName());
        user.setRole("USER");
        user = userRepository.save(user);

        return buildAuthResponse(user);
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new EntityNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new EntityNotFoundException("Invalid email or password");
        }

        return buildAuthResponse(user);
    }

    public AuthResponse refresh(String refreshTokenValue) {
        String tokenHash = sha256(refreshTokenValue);

        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));

        if (storedToken.isRevoked() || storedToken.getExpiresAt().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Refresh token expired or revoked");
        }

        User user = userRepository.findById(storedToken.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Revoke old refresh token (rotation)
        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        return buildAuthResponse(user);
    }

    public void logout(String refreshTokenValue) {
        String tokenHash = sha256(refreshTokenValue);
        refreshTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    private AuthResponse buildAuthResponse(User user) {
        String accessToken = jwtTokenProvider.generateAccessToken(user.getId(), user.getRole());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

        // Store hashed refresh token
        RefreshToken storedToken = new RefreshToken();
        storedToken.setUserId(user.getId());
        storedToken.setTokenHash(sha256(refreshToken));
        storedToken.setExpiresAt(Instant.now().plusSeconds(refreshTokenExpirySeconds));
        refreshTokenRepository.save(storedToken);

        return new AuthResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                accessToken,
                refreshToken
        );
    }

    private String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.getBytes());
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 not available", e);
        }
=======
    @Value("${admin.provisioning.secret:SF-PROV-SEC-2026-ADMIN-KEY}")
    private String adminProvisioningSecret;

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

        // Stub dev email dispatch to console
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        log.info("--- [DEV-MODE EMAIL LINK STUB] ---");
        log.info("To: {}", user.getEmail());
        log.info("Password Reset Link: {}", resetLink);
        log.info("----------------------------------");
        System.out.println("[DEV-MODE EMAIL LINK STUB] Password reset link for " + user.getEmail() + ": " + resetLink);
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
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
    }
}
