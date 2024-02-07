package com.KL1verse.Waggle.repository.entity;

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
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@Entity(name = "waggle_user_hashtag")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WaggleUserHashTag {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "waggle_id")
    private Waggle waggle;

    @Column(insertable = false, updatable = false)
    private Long waggle_id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "hashtags")
    private String hashtags;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt; // createdAt 필드 추가

}
