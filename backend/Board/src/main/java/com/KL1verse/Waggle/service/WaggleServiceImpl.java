package com.KL1verse.Waggle.service;

import com.KL1verse.Waggle.dto.req.WaggleDTO;
import com.KL1verse.Waggle.repository.WaggleRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class WaggleServiceImpl implements WaggleService {


    private final WaggleRepository waggleRepository;

    public WaggleServiceImpl(WaggleRepository waggleRepository) {
        this.waggleRepository = waggleRepository;
    }

    @Override
    public WaggleDTO getWaggleById(Long waggleId) {
        Waggle waggle = waggleRepository.findById(waggleId)
            .orElseThrow(() -> new RuntimeException("Waggle not found with id: " + waggleId));
        return convertToDTO(waggle);
    }

    @Override
    public WaggleDTO createWaggle(WaggleDTO waggleDTO) {
        Waggle waggle = convertToEntity(waggleDTO);
//        waggle.setWaggleId(waggleDTO.getWaggleId());
//        waggle.setBoardId(waggleDTO.getBoardId()); 대신 convertToEntity를 사용
        Waggle savedWaggle = waggleRepository.save(waggle);
        return convertToDTO(savedWaggle);
    }

    @Override
    public WaggleDTO updateWaggle(Long waggleId, WaggleDTO waggleDTO) {
        Waggle existingWaggle = waggleRepository.findById(waggleId)
            .orElseThrow(() -> new RuntimeException("Waggle not found with id: " + waggleId));

        BeanUtils.copyProperties(waggleDTO, existingWaggle);
        Waggle updatedWaggle = waggleRepository.save(existingWaggle);
        return convertToDTO(updatedWaggle);
    }

    @Override
    public void deleteWaggle(Long waggleId) {
        waggleRepository.deleteById(waggleId);
    }


    private WaggleDTO convertToDTO(Waggle waggle) {
        WaggleDTO waggleDTO = new WaggleDTO();
        BeanUtils.copyProperties(waggle, waggleDTO);
        return waggleDTO;
    }

    private Waggle convertToEntity(WaggleDTO waggleDTO) {
        Waggle waggle = new Waggle();
        BeanUtils.copyProperties(waggleDTO, waggle);
        return waggle;
    }

}
