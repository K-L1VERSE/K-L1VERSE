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

import { ToggleComponent } from "../../styles/BoardStyles/BoardStyle";

import MatchSchedulePage from "../../pages/match_page/MatchSchedulePage";
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
  const [matchList, setMatchList] = useState([]);
  const [selectedMatchTime, setSelectedMatchTime] = useState(""); // 선택한 경기의 시간

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 2;
    const fetchData = async () => {
      const result = await getMatchList(year, month);
      setMatchList(result);
      if (result.length > 0) {
        onMatchIdChange(result[0].matchId);
      }
    };
    fetchData();
  }, []);

  function handleFullFlagChange(e) {
    setFullFlag(e.target.checked);
  }

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

  const handleMatchClick = (selectedMatchId) => {
    setSelectedMatchId(selectedMatchId);
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
                console.log("matchId", matchId);
                // matchList에서 선택한 matchId에 해당하는 정보 찾기
              }}
              selectedMatchId={matchId}
            />
          </Small2>
        )}
        <TitleInput value={title} onChange={onTitleChange} placeholder="제목" />
        {/* <InputLabel>모집 내용</InputLabel> */}
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
