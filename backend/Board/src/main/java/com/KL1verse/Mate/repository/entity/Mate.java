package com.KL1verse.Mate.repository.entity;

import com.KL1verse.Board.repository.entity.Board;
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
import lombok.ToString;

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

    @Column(name = "total")
    private int total;

    @Column(name = "full_flag")
    private boolean fullFlag;

    @Column(name = "match_id")
    private int matchId;


}
