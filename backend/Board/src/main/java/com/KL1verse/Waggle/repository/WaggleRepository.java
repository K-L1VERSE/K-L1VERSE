package com.KL1verse.Waggle.repository;

import com.KL1verse.Waggle.repository.entity.Waggle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaggleRepository extends JpaRepository<Waggle, Long> {


}
