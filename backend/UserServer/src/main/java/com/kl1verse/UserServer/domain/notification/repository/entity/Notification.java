package com.kl1verse.UserServer.domain.notification.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import jakarta.persistence.*;

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

    @Convert(converter = NotificationTypeConverter.class)
    private NotificationType type;
    private String profile;
    private String nickname;
    private String homeTeamId;
    private String awayTeamId;
    private String content;
    private Boolean readFlag;
    private String uri;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
