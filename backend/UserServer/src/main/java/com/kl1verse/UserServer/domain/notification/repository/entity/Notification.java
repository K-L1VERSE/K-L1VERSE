package com.kl1verse.UserServer.domain.notification.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "notification")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Notification {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private NotificationType type;
    private String content;
    private Boolean readFlag;
    private String uri;
    private LocalDateTime createdAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
