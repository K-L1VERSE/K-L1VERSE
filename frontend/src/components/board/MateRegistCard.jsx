import React, { useState, useEffect } from "react";
import {
  TextArea,
  NumberInput,
  FlagInput,
  SubmitButton,
  TitleInput,
} from "../../styles/BoardStyles/BoardCreateStyle";
import { getMatchList } from "../../api/match";

export default function MateRegistCard({
  title,
  content,
  total,
  fullFlag,
  matchId,
  onTitleChange,
  onContentChange,
  onTotalChange,
  onFullFlagChange,
  onMatchIdChange,
  onSubmit,
  buttonText,
}) {
  const [matchList, setMatchList] = useState([]);

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

  return (
    <>
      <TitleInput
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <select value={matchId} onChange={(e) => onMatchIdChange(e.target.value)}>
        <option value="" disabled>
          경기를 선택하세요
        </option>
        {matchList.map((match) => (
          <option key={match.matchId} value={match.matchId}>
            {match.homeTeamName} vs {match.awayTeamName} - {match.matchAt}{" "}
          </option>
        ))}
      </select>
      <TextArea value={content} onChange={onContentChange} placeholder="내용" />
      <NumberInput
        type="number"
        value={total}
        onChange={onTotalChange}
        placeholder="총 인원"
      />
      다 찼어요
      <FlagInput
        type="checkbox"
        value={fullFlag}
        onChange={onFullFlagChange}
        placeholder="만석 여부"
      />
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </>
  );
}
