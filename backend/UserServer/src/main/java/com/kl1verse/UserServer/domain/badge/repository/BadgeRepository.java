package com.kl1verse.UserServer.domain.badge.repository;

import com.kl1verse.UserServer.domain.badge.repository.entity.Badge;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Integer> {
    List<Badge> findByUserId(Long userId);
}
