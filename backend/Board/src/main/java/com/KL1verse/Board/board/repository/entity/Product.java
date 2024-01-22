package com.KL1verse.Board.board.repository.entity;

import jakarta.persistence.*;

@Entity(name = "product")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class Product {

    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    private double price;

    @Column(name = "deal_flag")
    private boolean dealFlag;


}
