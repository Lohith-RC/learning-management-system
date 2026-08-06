package com.skillforge.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);
<<<<<<< HEAD
    void deleteByUser(User user);
=======
>>>>>>> fba9bbc1fddd5f0ee2eb8b1e79cfc2af5a58028f
}
