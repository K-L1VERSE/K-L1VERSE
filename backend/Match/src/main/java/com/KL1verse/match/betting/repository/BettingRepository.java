package com.KL1verse.match.betting.repository;

import com.KL1verse.match.betting.repository.entity.Betting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BettingRepository extends JpaRepository<Betting, Integer> {



}
