package com.KL1verse.Waggle.repository;

import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleUserHashTag;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleUserHashTagRepository extends JpaRepository<WaggleUserHashTag, Long> {
    List<WaggleUserHashTag> findByUserIdOrderByCreatedAtDesc(Integer userId);

    Page<WaggleUserHashTag> findByHashtagsContaining(String hashtag, Pageable pageable);
}

