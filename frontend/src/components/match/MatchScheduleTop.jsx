import React from "react";
import {
  LeftTop,
  RightSelect,
  TopContainer,
  TypeImg,
  TypeText,
} from "../../styles/MatchStyles/MatchScheduleStyle";
import ListIcon from "../../assets/icon/list-icon.png";
import CalendarIcon from "../../assets/icon/calendar-icon.png";

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
          <TypeImg src={ListIcon} />
          <TypeText>리스트</TypeText>
        </button>
        <button
          type="button"
          className={view === "calendar" ? "selected" : ""}
          onClick={() => setView("calendar")}
        >
          <TypeImg src={CalendarIcon} />
          <TypeText>캘린더</TypeText>
        </button>
      </RightSelect>
    </TopContainer>
  );
}
