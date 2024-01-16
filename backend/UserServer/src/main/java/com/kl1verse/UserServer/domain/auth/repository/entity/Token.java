package com.kl1verse.UserServer.domain.auth.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "token_id")
    private Long id;


    @Column(name = "refresh_token")
    private String refreshToken;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    User user;
}
