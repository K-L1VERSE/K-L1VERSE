//package com.KL1verse.Mate.service;
//
//
//import com.KL1verse.Mate.dto.req.MateDTO;
//import com.KL1verse.Mate.repository.MateRepository;
//import com.KL1verse.Mate.repository.entity.Mate;
//import java.util.List;
//import java.util.stream.Collectors;
//import org.springframework.beans.BeanUtils;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.stereotype.Service;
//
//@Service
//public class MateServiceImpl implements MateService {
//
//    private final MateRepository mateRepository;
//
//    public MateServiceImpl(MateRepository mateRepository) {
//        this.mateRepository = mateRepository;
//    }
//
//    @Override
//    public MateDTO getMateById(Long mateId) {
//        Mate mate = mateRepository.findById(mateId)
//            .orElseThrow(() -> new RuntimeException("Mate not found with id: " + mateId));
//        return convertToDTO(mate);
//    }
//
//    @Override
//    public List<MateDTO> getAllMateList() {
//        List<Mate> mateList = mateRepository.findAll();
//        return mateList.stream()
//            .map(this::convertToDTO)
//            .collect(Collectors.toList());
//    }
//
//    @Override
//    public MateDTO createMate(MateDTO mateDTO) {
//        Mate mate = convertToEntity(mateDTO);
//        Mate savedMate = mateRepository.save(mate);
//        return convertToDTO(savedMate);
//    }
//
//    @Override
//    public MateDTO updateMate(Long mateId, MateDTO mateDTO) {
//        Mate existingMate = mateRepository.findById(mateId)
//            .orElseThrow(() -> new RuntimeException("Mate not found with id: " + mateId));
//
//        BeanUtils.copyProperties(mateDTO, existingMate);
//        Mate updatedMate = mateRepository.save(existingMate);
//        return convertToDTO(updatedMate);
//    }
//
//    @Override
//    public void deleteMate(Long mateId) {
//        mateRepository.deleteById(mateId);
//    }
//
//
//    private MateDTO convertToDTO(Mate mate) {
//        MateDTO mateDTO = new MateDTO();
//        BeanUtils.copyProperties(mate, mateDTO);
//        return mateDTO;
//    }
//
//    private Mate convertToEntity(MateDTO mateDTO) {
//        Mate mate = new Mate();
//        BeanUtils.copyProperties(mateDTO, mate);
//        return mate;
//    }
//    @Override
//    public List<MateDTO> getMostRecentMates(int count) {
//        List<Mate> recentWaggles = mateRepository.findAll(
//            PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "board.createAt"))
//        ).getContent();
//
//        return recentWaggles.stream()
//            .map(this::convertToDTO)
//            .collect(Collectors.toList());
//    }
//}
