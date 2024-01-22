package com.KL1verse.Board.board.repository.entity;

import jakarta.persistence.*;

@Entity(name = "waggle")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class Waggle {

    @Id
    @Column(name = "waggle_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long waggleId;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;


}
