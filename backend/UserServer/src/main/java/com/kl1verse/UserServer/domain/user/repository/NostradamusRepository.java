package com.kl1verse.UserServer.domain.user.repository;

import com.kl1verse.UserServer.domain.user.repository.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NostradamusRepository  extends JpaRepository<User, Integer> {

    @Query(value = "SELECT * FROM user WHERE total_bet != 0 ORDER BY win_bet DESC, (win_bet / total_bet) DESC LIMIT 3", nativeQuery = true)
    List<User> getNostraList(); // 노스트라다무스 랭킹 3개만

}
