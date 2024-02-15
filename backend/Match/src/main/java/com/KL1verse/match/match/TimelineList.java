package com.KL1verse.match.match;

import com.KL1verse.match.match.dto.res.TimelineResponse;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@Getter
@Setter
public class TimelineList {

    private List<TimelineResponse>[] timelineMatchList = new List[1000];


    @PostConstruct
    public void init() {
        for (int i = 0; i < 1000; i++) {
            timelineMatchList[i] = new ArrayList<TimelineResponse>();
        }
    }

    public void addTimeline(int matchId, TimelineResponse timelineResponse) {
        timelineMatchList[matchId].add(timelineResponse);
    }

}
