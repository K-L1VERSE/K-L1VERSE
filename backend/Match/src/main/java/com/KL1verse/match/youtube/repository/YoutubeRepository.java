package com.KL1verse.match.youtube.repository;

import com.KL1verse.match.youtube.dto.req.YoutubeRankRequest;
import com.KL1verse.match.youtube.dto.res.YoutubeTimeResponse;
import com.KL1verse.match.youtube.repository.entity.Youtube;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface YoutubeRepository extends JpaRepository<Youtube, Integer> {


    @Query(value = "SELECT saved_at FROM youtube WHERE rank = :i", nativeQuery = true)
    YoutubeTimeResponse findOneById(@Param("i")int i);

}
