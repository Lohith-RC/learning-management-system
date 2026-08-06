package com.skillforge.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
<<<<<<< HEAD

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    void deleteByUserId(UUID userId);
=======
    Optional<RefreshToken> findByTokenHash(String tokenHash);
>>>>>>> ee6b88e89d1cd710fc3e67dc70fb42fbd3014ed3
}
