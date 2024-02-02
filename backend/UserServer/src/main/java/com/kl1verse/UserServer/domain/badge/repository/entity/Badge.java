package com.kl1verse.UserServer.domain.badge.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "badge")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private Integer id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "badge_detail_id")
    private BadgeDetail badgeDetail;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "buy_at")
    private LocalDateTime buyAt;
}
