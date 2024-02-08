import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MateItemCreated,
  MatchTitle,
  MatchTime,
} from "../../styles/BoardStyles/MateListStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../styles/BoardStyles/ProductListStyle";
import {
  ItemContainer,
  ItemContent,
  ItemInfoSection,
  ItemTitle,
} from "../../styles/BoardStyles/BoardStyle";
import { formatDateTime, formatRelativeTime } from "./dateFormat";
import { getMatchDetail } from "../../api/match";

function MateItemCard({ mate }) {
  const [matchDetail, setMatchDetail] = useState({});

  function getMatch() {
    getMatchDetail(mate.matchId).then((res) => {
      setMatchDetail(res);
    });
  }
  useEffect(() => {
    getMatch();
  }, []);

  return (
    <ItemContainer>
      {mate.fullFlag ? (
        <DealStatusOrange>모집완료</DealStatusOrange>
      ) : (
        <DealStatusGreen>모집중</DealStatusGreen>
      )}
      <ItemTitle>
        <Link to={`/mate/${mate.board.boardId}`}>
          <MatchTitle>
            {matchDetail.homeTeamName} vs {matchDetail.awayTeamName}
          </MatchTitle>
          <MatchTime>{formatDateTime(matchDetail.matchAt)}</MatchTime>
        </Link>
      </ItemTitle>
      <ItemContent>
        <Link to={`/mate/${mate.board.boardId}`}>
          <p>{mate.board.content}</p>
        </Link>
      </ItemContent>
      <ItemInfoSection>
        <MateItemCreated>{formatRelativeTime(mate.createAt)}</MateItemCreated>
      </ItemInfoSection>
    </ItemContainer>
  );
}

export default MateItemCard;
