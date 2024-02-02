package com.KL1verse.Waggle.repository.entity;

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
