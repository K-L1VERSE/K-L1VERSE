import React from "react";
import {
  Event,
  EventName,
  MemberInfo,
} from "../../styles/match-styles/MatchTimelinStyle";

export default function EventItem({
  eventName,
  teamName,
  memberName,
  memberName2,
  backNo,
  homeOrAway,
}) {
  return (
    <Event $home={homeOrAway === "HOME"}>
      <EventName>
        {eventName === "득점" && "🎉 "}
        {eventName === "교체" && <span>&#8693; </span>}
        {eventName === "경고" && "❕❗️ "}
        {eventName}
      </EventName>
      {memberName2 ? (
        <>
          <MemberInfo>In {memberName2}</MemberInfo>
          <MemberInfo>Out {memberName}</MemberInfo>
        </>
      ) : (
        memberName && (
          <MemberInfo>
            {teamName} {backNo}, {memberName}
          </MemberInfo>
        )
      )}
    </Event>
  );
}
