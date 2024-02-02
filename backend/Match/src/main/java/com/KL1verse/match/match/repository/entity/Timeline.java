package com.KL1verse.match.match.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
@DynamicUpdate
@Entity(name = "timeline")
public class Timeline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "timeline_id")
    private int timelineId;

    @Column(name = "match_id")
    private int matchId;

    @Column(name = "member_name")
    private String memberName;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "back_no")
    private int backNo;

    @Column(name = "time_min")
    private int timeMin;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "home_or_away")
    private String homeOrAway;

}
