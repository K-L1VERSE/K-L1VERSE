package com.KL1verse.match.scheduler.service;

import com.KL1verse.match.kafka.producer.KafkaMatchNotificationProducer;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class SchedulerService {

    private final ThreadPoolTaskScheduler taskScheduler;
    private final List<ScheduledFuture<?>> scheduledTasks = new ArrayList<>();
    private final KafkaMatchNotificationProducer kafkaMatchNotificationProducer;

    // 동적으로 스케줄된 작업을 예약
    public void scheduleTask(String cronExpression, int matchId) {
        // 예시: 매 5초마다 실행되는 작업
        Runnable task = () -> {
            log.info("matchId: {} 경기가 30분 전입니다.", matchId);

            // 여기에 원하는 작업 수행
            kafkaMatchNotificationProducer.matchNotification(matchId);

        };

        // 스케줄된 작업 예약
        ScheduledFuture<?> scheduledTask = taskScheduler.schedule(task, new Trigger() {
            @Override
            public Instant nextExecution(TriggerContext triggerContext) {
                CronTrigger crontrigger = new CronTrigger(cronExpression);
                return crontrigger.nextExecution(triggerContext);
            }
        });
    }

    // 동적으로 스케줄된 작업을 제거
    public void cancelAllScheduledTasks() {
        for (ScheduledFuture<?> scheduledTask : scheduledTasks) {
            if (scheduledTask != null && !scheduledTask.isCancelled()) {
                scheduledTask.cancel(true);
            }
        }
        // 리스트 초기화
        scheduledTasks.clear();
    }
}
