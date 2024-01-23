package com.KL1verse.match.match.repository;

import com.KL1verse.match.match.repository.entity.Timeline;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimelineRepository extends JpaRepository<Timeline, Integer> {

    List<Timeline> findByMatchId (int matchId);

}
