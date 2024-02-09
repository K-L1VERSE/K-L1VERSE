import React, { useState, useEffect } from "react";
import {
  TextArea,
  NumberInput,
  FlagInput,
  SubmitButton,
  TitleInput,
  SelectInput,
  FlagInputText,
  FlagInputContainer,
  FlagInputLabel,
  FlagInputCheckbox,
  FlagInputSlider,
  InputLabel,
} from "../../styles/BoardStyles/BoardCreateStyle";
import { getMatchList } from "../../api/match";
import { formatDateTime } from "../../components/board/dateFormat";
import {
  MateInputLabel,
  MateInputText,
  MateNumberContainer,
  MateNumberInput,
} from "../../styles/BoardStyles/MateListStyle";

function MateRegistCard({
  title,
  content,
  total,
  matchId,
  fullFlag: initialFullFlag,
  onTitleChange,
  onContentChange,
  onTotalChange,
  onfullFlag,
  onFullFlagChange,
  onMatchIdChange,
  onSubmit,
  buttonText,
}) {
  const [matchList, setMatchList] = useState([]);
  const [fullFlag, setFullFlag] = useState(initialFullFlag);
  const [selectedMatchTime, setSelectedMatchTime] = useState(""); // 선택한 경기의 시간

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 2;
    const fetchData = async () => {
      const result = await getMatchList(year, month);
      setMatchList(result);
    };
    fetchData();
  }, []);

  function handleFullFlagChange(e) {
    setFullFlag(e.target.checked);
  }

  return (
    <>
      <FlagInputContainer>
        <FlagInputLabel>
          <FlagInputCheckbox
            type="checkbox"
            checked={fullFlag}
            onChange={handleFullFlagChange}
          />
          <FlagInputSlider />
        </FlagInputLabel>
        <FlagInputText>모집중</FlagInputText>
      </FlagInputContainer>
      <InputLabel>경기 일정</InputLabel>
      <SelectInput
        value={matchId}
        onChange={(e) => onMatchIdChange(e.target.value)}
      >
        <option value="" disabled>
          경기를 선택하세요
        </option>
        {matchList.map((match) => (
          <option key={match.matchId} value={match.matchId}>
            {match.homeTeamName} vs {match.awayTeamName} -{" "}
            {formatDateTime(match.matchAt)}{" "}
          </option>
        ))}
      </SelectInput>
      <InputLabel>모집 내용</InputLabel>
      <TextArea
        value={content}
        onChange={onContentChange}
        placeholder="내용을 입력하세요"
      />
      <InputLabel>모집 인원</InputLabel>
      <MateNumberContainer>
        <MateNumberInput
          type="number"
          value={total}
          onChange={onTotalChange}
          placeholder="총 인원"
        />
        <MateInputText>명</MateInputText>
      </MateNumberContainer>
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </>
  );
}

export default MateRegistCard;
