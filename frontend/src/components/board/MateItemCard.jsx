import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MateItemInfoSection,
  MateItemCreated,
} from "../../styles/BoardStyles/MateListStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../styles/BoardStyles/ProductListStyle";
import {
  ItemContainer,
  ItemContent,
  ItemTitle,
} from "../../styles/BoardStyles/BoardStyle";
import { formatRelativeTime } from "./dateFormat";
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
          {matchDetail.homeTeamName} vs {matchDetail.awayTeamName}{" "}
          {matchDetail.matchAt}
        </Link>
      </ItemTitle>
      <ItemContent>
        <Link to={`/mate/${mate.board.boardId}`}>
          <p>{mate.board.content}</p>
        </Link>
      </ItemContent>
      <MateItemInfoSection>
        <MateItemCreated>{formatRelativeTime(mate.createAt)}</MateItemCreated>
      </MateItemInfoSection>
    </ItemContainer>
  );
}

export default MateItemCard;
