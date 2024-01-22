package com.KL1verse.Board.board.repository.entity;

import jakarta.persistence.*;

@Entity(name = "mate")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class Mate {

    @Id
    @Column(name = "mate_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long mateId;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    private int total;

    @Column(name = "full_flag")
    private boolean fullFlag;

    @Column(name = "match_id")
    private String matchId;


}
