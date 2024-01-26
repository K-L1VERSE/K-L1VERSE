package com.KL1verse.match.scheduler.controller;

import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.KL1verse.match.scheduler.service.SchedulerService;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SchedulerController {

    private final MatchRepository matchRepository;
    private final SchedulerService schedulerService;

    @Scheduled(fixedDelay = Long.MAX_VALUE)
    public void onStartup() {
        log.info("Server start!");

        getTodayMatches().forEach(match -> {
            String cronExpression = getCronExpression(match);
            schedulerService.scheduleTask(cronExpression ,match.getMatchId());
            log.info("matchId: {} 경기가 cronExpression: {} 알림 예약 완료되었습니다.", match.getMatchId(), cronExpression);
        });
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void checkTodayMatch() {
        schedulerService.cancelAllScheduledTasks();;

        getTodayMatches().forEach(match -> {
            String cronExpression = getCronExpression(match);
            schedulerService.scheduleTask(cronExpression ,match.getMatchId());
            log.info("matchId: {} 경기가 cronExpression: {} 알림 예약 완료되었습니다.", match.getMatchId(), cronExpression);
        });

    }

    private List<Match> getTodayMatches() {
        return matchRepository.findTodayMatches();
    }

    private String getCronExpression(Match match) {
        LocalDateTime matchDate = match.getMatchAt();
        LocalDateTime thirtyMinutesBefore = matchDate.minusMinutes(30);
        String cronExpression = convertToCronExpression(thirtyMinutesBefore);
        log.info("cronExpression: {}", cronExpression);

        return cronExpression;
    }

    private String convertToCronExpression(LocalDateTime localDateTime) {
        // LocalDateTime을 cron 표현식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ss mm HH dd MM *");
        return localDateTime.format(formatter);
    }
}
