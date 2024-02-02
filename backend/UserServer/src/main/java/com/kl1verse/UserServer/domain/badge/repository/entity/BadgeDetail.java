package com.kl1verse.UserServer.domain.badge.repository.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity(name = "badge_detail")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class BadgeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_detail_id")
    private Integer id;

    private String description;
    private String code;
    private Integer price;
}
