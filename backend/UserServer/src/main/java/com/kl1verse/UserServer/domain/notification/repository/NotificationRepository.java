package com.kl1verse.UserServer.domain.notification.repository;

import com.kl1verse.UserServer.domain.notification.repository.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

}
