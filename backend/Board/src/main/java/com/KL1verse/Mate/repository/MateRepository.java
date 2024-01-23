package com.KL1verse.Mate.repository;

import com.KL1verse.Mate.repository.entity.Mate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MateRepository extends JpaRepository<Mate, Long> {


}
