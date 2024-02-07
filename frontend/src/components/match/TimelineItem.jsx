import React from "react";
import {
  TimelineWrap,
  TimeMin,
  //   Event,
  //   EventName,
  //   MemberInfo,
} from "../../styles/MatchStyles/MatchTimelinStyle";
import EventItem from "./EventItem";

export default function TimelineItem({ timelines }) {
  // timelineId: 0,
  //   memberName: "",
  //   memberName2: "",
  //   backNo: 0,
  //   teamName: "",
  //   eventName: "경기종료",
  //   timeMin: 0,
  //   homeOrAway: "AWAY",

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
      {/* {timeline.homeOrAway === "AWAY" && (
          <TimeMin>{timeline.timeMin}</TimeMin>
        )}
        <Event>
          <EventName>
            {timeline.eventName === "득점" && "🎉 "}
            {timeline.eventName === "교체" && <span>&#8693; </span>}
            {timeline.eventName === "경고" && "❕❗️ "}
            {timeline.eventName}
          </EventName>
          {timeline.memberName2 ? (
            <>
              <MemberInfo>In {timeline.memberName2}</MemberInfo>
              <MemberInfo>Out {timeline.memberName}</MemberInfo>
            </>
          ) : (
            timeline.memberName && (
              <MemberInfo>
                {timeline.teamName} {timeline.backNo}, {timeline.memberName}
              </MemberInfo>
            )
          )}
        </Event>
        {timeline.homeOrAway === "HOME" && (
          <TimeMin>{timeline.timeMin}</TimeMin>
        )} */}
    </TimelineWrap>
  );
}
