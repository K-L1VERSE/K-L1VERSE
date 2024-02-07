import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MateItemTitle,
  MateItemContent,
  MateItemInfoSection,
  MateItemCreated,
} from "../../styles/BoardStyles/MateListStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../styles/BoardStyles/ProductListStyle";
import { ItemContainer } from "../../styles/BoardStyles/BoardStyle";
import { getMatchDetail } from "../../api/match";

function MateItemCard({ mate }) {
  const [matchDetail, setMatchDetail] = useState({});

  function getMatch() {
    getMatchDetail(mate.matchId).then(({ data }) => {
      console.log(data);
      setMatchDetail(data);
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
      <MateItemTitle>
        <Link
          to={`/mate/${mate.board.boardId}`}
          // style={{ textDecoration: "none", color: "black" }}
        >
          {matchDetail.HomeTeamName} vs {matchDetail.AwayTeamName}{" "}
          {matchDetail.MatchDate}
        </Link>
      </MateItemTitle>
      <MateItemContent>
        <Link
          to={`/mate/${mate.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{mate.board.content}</p>
        </Link>
      </MateItemContent>
      <MateItemInfoSection>
        <MateItemCreated>{mate.createAt}</MateItemCreated>
      </MateItemInfoSection>
    </ItemContainer>
  );
}

export default MateItemCard;
