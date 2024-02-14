import React, { useState, useEffect } from "react";
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

import { Small, ToggleComponent } from "../../styles/BoardStyles/BoardStyle";

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
        <div>경기 선택</div>
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
          <Small>
            <ScheduleModal
              value={matchId}
              isMateListPage={true}
              defaultValue={matchId}
              onMatchClick={(matchId) => {
                onMatchIdChange(matchId);
              }}
              selectedMatchId={matchId}
            />
          </Small>
        )}
        <TitleInput
          value={title}
          onChange={onTitleChange}
          placeholder="Title"
        />
        {/* <InputLabel>모집 내용</InputLabel> */}
        <div style={{ height: "1rem" }} />
        <TextArea
          value={content}
          onChange={onContentChange}
          placeholder="Fill the content here"
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
