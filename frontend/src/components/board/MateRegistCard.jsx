import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  TextArea,
  SubmitButton,
  TitleInput,
  InputLabel,
  ToggleContainer,
  OuterCircle,
  InnerCircle,
  RegistCardContainer,
} from "../../styles/BoardStyles/BoardCreateStyle";
import { getMatchList } from "../../api/match";
import {
  MateInputText,
  MateNumberContainer,
  MateNumberInput,
} from "../../styles/BoardStyles/MateListStyle";
import {
  MatchDetailContainerBox,
  MatchDetailContainer,
  MatchDateText,
} from "../../styles/BoardStyles/MateCreateStyle";
import {
  NotificationMatchContainer,
  NotificationMatchImg,
  NotificationMatchText,
  NotificationMatchTeamContainer,
  NotificationMatchVersus,
} from "../../styles/notification-styles/NotificationStyle";

import { ToggleComponent } from "../../styles/BoardStyles/BoardStyle";

import ScheduleModal from "./toggle/ScheduleModal";

function MateRegistCard({
  title,
  content,
  total,
  matchId,
  fullFlag,
  onTitleChange,
  onContentChange,
  onTotalChange,
  onMatchIdChange,
  onSubmit,
  buttonText,
  handleFullFlag,
  isUpdateMode,
}) {
  // useEffect(() => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth() + 2;
  //   const fetchData = async () => {
  //     const result = await getMatchList(year, month);
  //     setMatchList(result);
  //     if (result.length > 0) {
  //       onMatchIdChange(result[0].matchId);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const [selectedMatch, setSelectedMatch] = useState([]);
  const [isToggled, setIsToggled] = useState(true);

  const handleToggele = () => {
    if (isUpdateMode) {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">경기를 변경할 수 없어요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
      return;
    }
    setIsToggled(!isToggled);
  };

  return (
    <>
      <ToggleContainer>
        <OuterCircle $dealFlag={!fullFlag} onClick={handleFullFlag}>
          <InnerCircle $dealFlag={!fullFlag} />
        </OuterCircle>
        <div>{fullFlag ? "모집완료" : "모집중"}</div>
      </ToggleContainer>

      <RegistCardContainer>
        <div style={{ fontSize: "0.85rem" }}>경기 선택</div>
        <ToggleComponent>
          <button onClick={handleToggele} type="button">
            {isToggled ? (
              <div>
                캘린더&nbsp;&nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            ) : (
              <div>
                캘린더&nbsp;&nbsp; <FontAwesomeIcon icon={faCaretUp} />
              </div>
            )}
          </button>
        </ToggleComponent>
        {isToggled ? (
          <div />
        ) : (
          <Small2>
            <ScheduleModal
              value={matchId}
              isMateListPage={true}
              defaultValue={matchId}
              onMatchClick={(matchId) => {
                onMatchIdChange(matchId);
                setIsToggled(true);
              }}
              selectedMatchId={matchId}
              setSelectedMatch={setSelectedMatch}
              type="regist"
            />
          </Small2>
        )}
        {selectedMatch && selectedMatch.matchId && (
          <MatchDetailContainerBox>
            <MatchDetailContainer>
              <MatchDateText>
                {new Date(selectedMatch.matchAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  weekday: "long",
                })}
              </MatchDateText>
              <MatchDateText>
                {new Date(selectedMatch.matchAt).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </MatchDateText>
            </MatchDetailContainer>
            <MatchDetailContainer>
              <NotificationMatchContainer
                style={{
                  gap: "0.2rem",
                }}
              >
                <NotificationMatchTeamContainer
                  style={{
                    gap: "0.2rem",
                  }}
                >
                  <NotificationMatchImg
                    src={`${process.env.PUBLIC_URL}/badge/badge${selectedMatch.homeTeamId}.png`}
                  />
                  <NotificationMatchText>
                    {selectedMatch.homeTeamName}
                  </NotificationMatchText>
                </NotificationMatchTeamContainer>
                <NotificationMatchVersus>vs</NotificationMatchVersus>
                <NotificationMatchTeamContainer
                  style={{
                    gap: "0.2rem",
                  }}
                >
                  <NotificationMatchImg
                    src={`${process.env.PUBLIC_URL}/badge/badge${selectedMatch.awayTeamId}.png`}
                  />
                  <NotificationMatchText>
                    {selectedMatch.awayTeamName}
                  </NotificationMatchText>
                </NotificationMatchTeamContainer>
              </NotificationMatchContainer>
            </MatchDetailContainer>
          </MatchDetailContainerBox>
        )}
        <TitleInput value={title} onChange={onTitleChange} placeholder="제목" />
        <div style={{ height: "1rem" }} />
        <TextArea
          value={content}
          onChange={onContentChange}
          placeholder="상세 내용"
        />
        <InputLabel>모집 인원</InputLabel>
        <MateNumberContainer>
          <MateNumberInput
            type="text"
            value={total}
            onChange={onTotalChange}
            placeholder="총 인원"
          />
          <MateInputText>명</MateInputText>
        </MateNumberContainer>
        <br />
        <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
      </RegistCardContainer>
    </>
  );
}

export default MateRegistCard;

export const Small2 = styled.div`
  position: absolute;
  top: 10.5rem;
  left: 6rem;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 7px;
  width: 15rem;
  // height: 21.2rem;
  height: auto;
  max-height: 27rem;
  z-index: 1;
  overflow-y: scroll;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.22);

  @media (min-width: 700px) {
    left: 40%;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #c7c8cc;
  }
`;
