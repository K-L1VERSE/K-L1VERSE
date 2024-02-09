import React from "react";
import {
  TimelineWrap,
  TimeMin,
} from "../../styles/MatchStyles/MatchTimelinStyle";
import EventItem from "./EventItem";
// import TimelineItem from "./TimelineItem";

export default function TimelineConatiner() {
  const timelines = [
    {
      timelineId: 0,
      memberName: "",
      memberName2: "",
      backNo: 0,
      teamName: "",
      eventName: "전반시작",
      timeMin: 0,
      homeOrAway: "AWAY",
    },
    {
      timelineId: 1,
      memberName: "강성진",
      memberName2: "",
      backNo: 11,
      teamName: "서울",
      eventName: "유효슈팅",
      timeMin: 3,
      homeOrAway: "AWAY",
    },
    {
      timelineId: 2,
      memberName: "강성진",
      memberName2: "",
      backNo: 11,
      teamName: "서울",
      eventName: "득점",
      timeMin: 6,
      homeOrAway: "AWAY",
    },
    {
      timelineId: 3,
      memberName: "김경민",
      memberName2: "이시영",
      backNo: 0,
      teamName: "",
      eventName: "교체",
      timeMin: 6,
      homeOrAway: "HOME",
    },
    {
      timelineId: 3,
      memberName: "강성진",
      memberName2: "",
      backNo: 11,
      teamName: "",
      eventName: "경고",
      timeMin: 6,
      homeOrAway: "AWAY",
    },
    {
      timelineId: 0,
      memberName: "",
      memberName2: "",
      backNo: 0,
      teamName: "",
      eventName: "전반종료",
      timeMin: 0,
      homeOrAway: "AWAY",
    },
    {
      timelineId: 0,
      memberName: "",
      memberName2: "",
      backNo: 0,
      teamName: "",
      eventName: "후반시작",
      timeMin: 0,
      homeOrAway: "AWAY",
    },
    {
      timelineId: 0,
      memberName: "",
      memberName2: "",
      backNo: 0,
      teamName: "",
      eventName: "경기종료",
      timeMin: 0,
      homeOrAway: "AWAY",
    },
  ];

  return (
    <TimelineWrap>
      <table>
        {timelines.map((timeline) => (
          <tr>
            <td width="45%">
              {timeline.homeOrAway === "HOME" && (
                <EventItem
                  eventName={timeline.eventName}
                  teamName={timeline.teamName}
                  memberName={timeline.memberName}
                  memberName2={timeline.memberName2}
                  backNo={timeline.backNo}
                  homeOrAway={timeline.homeOrAway}
                />
              )}
            </td>
            <td width="10%">
              <TimeMin>{timeline.timeMin} &#8216;</TimeMin>
            </td>
            <td width="45%">
              {timeline.homeOrAway === "AWAY" && (
                <EventItem
                  eventName={timeline.eventName}
                  teamName={timeline.teamName}
                  memberName={timeline.memberName}
                  memberName2={timeline.memberName2}
                  backNo={timeline.backNo}
                  homeOrAway={timeline.homeOrAway}
                />
              )}
            </td>
          </tr>
        ))}
      </table>
    </TimelineWrap>
  );
}
