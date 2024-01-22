//package com.KL1verse.Waggle.service;
//
//import com.KL1verse.Waggle.dto.req.WaggleLikeDTO;
//import com.KL1verse.Waggle.repository.WaggleLikeRepository;
//import com.KL1verse.Waggle.repository.entity.WaggleLike;
//import org.springframework.beans.BeanUtils;
//import org.springframework.stereotype.Service;
//
//@Service
//public class WaggleLikeServiceImpl implements WaggleLikeService {
//
//  private final WaggleLikeRepository waggleLikeRepository;
//
//  public WaggleLikeServiceImpl(WaggleLikeRepository waggleLikeRepository) {
//    this.waggleLikeRepository = waggleLikeRepository;
//  }
//
//  @Override
//  public WaggleLikeDTO createWaggleLike(WaggleLikeDTO waggleLikeDto) {
//    WaggleLike waggleLike = convertToEntity(waggleLikeDto);
//    WaggleLike savedWaggleLike = waggleLikeRepository.save(waggleLike);
//    return convertToDTO(savedWaggleLike);
//  }
//
//  @Override
//  public void deleteWaggleLike(Long likesId) {
//    waggleLikeRepository.deleteById(likesId);
//  }
//
//
//  private WaggleLikeDTO convertToDTO(WaggleLike waggleLike) {
//    WaggleLikeDTO waggleLikeDto = new WaggleLikeDTO();
//    BeanUtils.copyProperties(waggleLike, waggleLikeDto);
//    return waggleLikeDto;
//  }
//
//  private WaggleLike convertToEntity(WaggleLikeDTO waggleLikeDto) {
//    WaggleLike waggleLike = new WaggleLike();
//    BeanUtils.copyProperties(waggleLikeDto, waggleLike);
////    waggleLikeDto 객체의 속성 값을 waggleLike 객체로 복사
//    return waggleLike;
//  }
//}
