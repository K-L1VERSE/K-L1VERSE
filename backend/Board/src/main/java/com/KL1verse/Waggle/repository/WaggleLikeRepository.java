package com.KL1verse.Waggle.repository;

import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleLike;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleLikeRepository extends JpaRepository<WaggleLike, Long> {
  Optional<WaggleLike> findByUserIdAndWaggleId_WaggleId(Long userId, Long waggleId);

  void deleteByWaggleIdAndUserId(Waggle waggle, Long userId);

}