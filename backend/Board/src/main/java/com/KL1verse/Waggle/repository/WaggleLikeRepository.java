package com.KL1verse.Waggle.repository;

import com.KL1verse.Waggle.repository.entity.WaggleLike;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleLikeRepository extends JpaRepository<WaggleLike, Long> {

    Optional<WaggleLike> findByUserIdAndWaggleId_WaggleId(Integer userId, Long waggleId);

    @Query(value = "SELECT nickname, profile FROM user WHERE user_id = :userId", nativeQuery = true)
    List<Object[]> findNicknameAndProfileByUserId(Integer userId);

    List<WaggleLike> findByWaggleIdWaggleId(Long waggleId);
}