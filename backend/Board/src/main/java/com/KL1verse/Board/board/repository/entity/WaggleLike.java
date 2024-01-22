package com.KL1verse.Board.board.repository.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "waggle_like")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WaggleLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likes_id")
    private Long likesId;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "waggle_id")
    private Long waggleId;

}
