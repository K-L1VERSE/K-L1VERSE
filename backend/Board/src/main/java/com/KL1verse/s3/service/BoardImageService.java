//package com.KL1verse.s3.service;
//
//import com.KL1verse.Board.repository.entity.Board;
//import com.KL1verse.s3.repository.BoardImageRepository;
//import com.KL1verse.s3.repository.entity.BoardImage;
//import com.KL1verse.s3.repository.entity.File;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class BoardImageService {
//
//    private final BoardImageRepository boardImageRepository;
//
//    public void saveBoardImage(Board board, File file) {
//        boardImageRepository.save(BoardImage.builder()
//                .board(board)
//                .file(file)
//                .build());
//    }
//}
