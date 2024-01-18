package com.kl1verse.UserServer.domain.badge.repository.entity;

import com.kl1verse.UserServer.domain.user.repository.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "badge_id")
    private Integer id;

    @Column(name = "badge_code")
    private Integer code;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "buy_at")
    private LocalDateTime buyAt;
}
