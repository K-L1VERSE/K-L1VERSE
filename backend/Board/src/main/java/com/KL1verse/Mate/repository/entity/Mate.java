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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mateId;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @Column(name = "total")
    private int total; // 총 인원수

    @Column(name = "full_flag")
    private boolean fullFlag; // 인원수가 다 찼는지 여부

    @Column(name = "match_id")
    private int matchId;


}
