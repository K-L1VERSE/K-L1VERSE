package com.kl1verse.UserServer.domain.user.repository;

import com.kl1verse.UserServer.domain.user.repository.entity.User;

import java.util.List;
import java.util.Optional;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndDomain(String email, String domain);

    Optional<User> findByNickname(String nickname);

    @Query(value = "SELECT u.* FROM user u JOIN badge b ON u.badge_id = b.badge_id JOIN badge_detail bd ON b.badge_detail_id = bd.badge_detail_id WHERE bd.code = :teamCode", nativeQuery = true)
    List<User> findByTeamCode(@Param("teamCode") String teamCode);
}
