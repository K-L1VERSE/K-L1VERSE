package com.KL1verse.Waggle.repository;

import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleUserHashTag;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleUserHashTagRepository extends JpaRepository<WaggleUserHashTag, Long> {
    List<WaggleUserHashTag> findByUserIdOrderByCreatedAtDesc(Integer userId);

    @Query(value = "SELECT * FROM waggle_user_hashtag wuh WHERE wuh.user_id = :userId ORDER BY wuh.created_at DESC", nativeQuery = true)
    List<WaggleUserHashTag> findAllByUserId(@Param("userId") Integer userId);

    @Query(value = "SELECT GROUP_CONCAT(hashtags) FROM (SELECT hashtags FROM waggle_user_hashtag GROUP BY hashtags ORDER BY COUNT(*) DESC LIMIT 10) AS top_hashtags", nativeQuery = true)
    String findMostViewedHashtags();

    List<WaggleUserHashTag> findByUserIdAndWaggle_Board_BoardIdAndIsLiked(Integer userId, Long boardId, Boolean isLiked);

    WaggleUserHashTag findByUserIdAndWaggle_Board_BoardIdAndHashtagsAndIsLiked(Integer userId, Long waggleId, String hashtag, boolean isLiked);

    List<WaggleUserHashTag> findByWaggleWaggleId(Long waggleId);
}

