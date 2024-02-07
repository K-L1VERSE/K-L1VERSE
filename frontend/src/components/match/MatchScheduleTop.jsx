import React from "react";
import {
  LeftTop,
  RightSelect,
  TopContainer,
  TypeText,
} from "../../styles/MatchStyles/MatchScheduleStyle";
import { ReactComponent as ListIcon } from "../../assets/icon/list-icon.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icon/calendar-icon.svg";

export default function MatchScheduleTop({ setView, view }) {
  return (
    <TopContainer>
      <LeftTop>
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Calendar.png"
          alt="Calendar"
          width="20"
          height="20"
        />
        <div>경기 일정</div>
      </LeftTop>
      <RightSelect>
        <button
          type="button"
          className={view === "list" ? "selected" : ""}
          onClick={() => setView("list")}
        >
          <ListIcon />
          <TypeText>리스트</TypeText>
        </button>
        <button
          type="button"
          className={view === "calendar" ? "selected" : ""}
          onClick={() => setView("calendar")}
        >
          <CalendarIcon />
          <TypeText>캘린더</TypeText>
        </button>
      </RightSelect>
    </TopContainer>
  );
}
