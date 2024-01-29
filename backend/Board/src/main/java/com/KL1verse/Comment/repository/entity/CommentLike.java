package com.KL1verse.Comment.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Waggle_colikes")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class CommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "comment_like_id")
    private Long commentLikeId;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment commentId;


}
