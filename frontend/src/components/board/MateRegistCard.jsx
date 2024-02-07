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
} from "../../styles/BoardStyles/BoardCreateStyle";
import { getMatchList } from "../../api/match";

export default function MateRegistCard({
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
  const [fullFlag, setFullFlag] = useState(initialFullFlag); // 추가된 상태

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
            onChange={onFullFlagChange}
          />
          <FlagInputSlider />
        </FlagInputLabel>
        <FlagInputText>모집중</FlagInputText>
      </FlagInputContainer>

      <TitleInput
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <SelectInput
        value={matchId}
        onChange={(e) => onMatchIdChange(e.target.value)}
      >
        <option value="" disabled>
          경기를 선택하세요
        </option>
        {matchList.map((match) => (
          <option key={match.matchId} value={match.matchId}>
            {match.homeTeamName} vs {match.awayTeamName} - {match.matchAt}{" "}
          </option>
        ))}
      </SelectInput>
      <TextArea value={content} onChange={onContentChange} placeholder="내용" />
      <FlagInputContainer>
        <NumberInput
          type="number"
          value={total}
          onChange={onTotalChange}
          placeholder="총 인원"
        />
      </FlagInputContainer>
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </>
  );
}
