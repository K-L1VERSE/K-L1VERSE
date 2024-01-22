package com.KL1verse.Board.board.service.impl;

import com.KL1verse.Board.board.dto.BoardDTO;
import com.KL1verse.Board.board.repository.BoardRepository;
import com.KL1verse.Board.board.repository.entity.Board;
import com.KL1verse.Board.board.service.BoardService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WaggleServiceImpl implements WaggleService {
    @Autowired
    private WaggleRepository waggleRepository;

    // WAGGLE 게시글 생성
    @Override
    public Long createWaggle(WaggleDTO waggleDTO) {
        Waggle waggle = Waggle.builder()
            // DTO 필드를 엔터티 필드로 매핑
            .build();

        waggleRepository.save(waggle);
        return waggle.getWaggleId();
    }

}
