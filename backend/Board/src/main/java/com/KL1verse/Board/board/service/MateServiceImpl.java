package com.KL1verse.Board.board.service.impl;

@Service
public class MateServiceImpl implements MateService {
    @Autowired
    private MateRepository mateRepository;

    // MATE 게시글 생성
    @Override
    public Long createMate(MateDTO mateDTO) {
        Mate mate = Mate.builder()
            // DTO 필드를 엔터티 필드로 매핑
            .build();

        mateRepository.save(mate);
        return mate.getMateId();
    }
}