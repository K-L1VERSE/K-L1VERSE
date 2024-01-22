package com.KL1verse.Board.board.service.impl;

import com.KL1verse.Board.board.dto.req.WaggleLikeDto;
import com.KL1verse.Board.board.repository.WaggleLikeRepository;
import com.KL1verse.Board.board.repository.entity.WaggleLike;
import com.KL1verse.Board.board.service.WaggleLikeService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WaggleLikeServiceImpl implements WaggleLikeService {

  private final WaggleLikeRepository waggleLikeRepository;

  public WaggleLikeServiceImpl(WaggleLikeRepository waggleLikeRepository) {
    this.waggleLikeRepository = waggleLikeRepository;
  }

  @Override
  public WaggleLikeDto createWaggleLike(WaggleLikeDto waggleLikeDto) {
    WaggleLike waggleLike = convertToEntity(waggleLikeDto);
    WaggleLike savedWaggleLike = waggleLikeRepository.save(waggleLike);
    return convertToDTO(savedWaggleLike);
  }

  @Override
  public void deleteWaggleLike(Long likesId) {
    waggleLikeRepository.deleteById(likesId);
  }

  @Override
  public List<WaggleLikeDto> getWaggleLikesByBoardId(Long boardId) {
    List<WaggleLike> waggleLikes = waggleLikeRepository.findByWaggleId(boardId);
    return waggleLikes.stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  private WaggleLikeDto convertToDTO(WaggleLike waggleLike) {
    WaggleLikeDto waggleLikeDto = new WaggleLikeDto();
    BeanUtils.copyProperties(waggleLike, waggleLikeDto);
    return waggleLikeDto;
  }

  private WaggleLike convertToEntity(WaggleLikeDto waggleLikeDto) {
    WaggleLike waggleLike = new WaggleLike();
    BeanUtils.copyProperties(waggleLikeDto, waggleLike);
//    waggleLikeDto 객체의 속성 값을 waggleLike 객체로 복사
    return waggleLike;
  }
}
