package com.kl1verse.UserServer.domain.badge.repository;

import com.kl1verse.UserServer.domain.badge.repository.entity.BadgeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BadgeDetailRepository extends JpaRepository<BadgeDetail, Integer> {

    Optional<BadgeDetail> findByCode(String code);
}
