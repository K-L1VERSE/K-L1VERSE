package com.kl1verse.UserServer.domain.user.repository;

import com.kl1verse.UserServer.domain.user.repository.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndDomain(String email, String domain);

}
