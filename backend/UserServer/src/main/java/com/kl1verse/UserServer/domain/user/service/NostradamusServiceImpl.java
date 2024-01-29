package com.kl1verse.UserServer.domain.user.service;

import com.kl1verse.UserServer.domain.user.dto.res.NostradamusResponse;
import com.kl1verse.UserServer.domain.user.repository.NostradamusRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class NostradamusServiceImpl {

    private final NostradamusRepository nostradamusRepository;

    public List<NostradamusResponse> getNostraList() {

        List<User> userList = nostradamusRepository.getNostraList();
        List<NostradamusResponse> nostraResponses = new ArrayList<>();

        float accurate;

        for (User user : userList) {
            if (user.getTotalBet() == 0) {
                accurate = 0.0f;
            } else {
                accurate = (float) ((float) user.getWinBet() / user.getTotalBet() * 100.0);
            }
            nostraResponses.add(NostradamusResponse.builder()
                .nickname(user.getNickname())
                .winBet(user.getWinBet())
                .accurate(Math.round(accurate))
                .build());
        }

        return nostraResponses;
    }
}
