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
  TitleComponent,
} from "../../styles/BoardStyles/BoardStyle";
import { formatDateTime, formatRelativeTime } from "./dateFormat";
import { getMatchDetail } from "../../api/match";

function MateItemCard({ mate, user, fromMypage, category }) {
  const [matchDetail, setMatchDetail] = useState(undefined);

  function getMatch() {
    if (mate.matchId) {
      getMatchDetail(mate.matchId).then((res) => {
        setMatchDetail(res);
      });
    }
  }
  useEffect(() => {
    getMatch();
  }, []);

  return (
    <div>
      {matchDetail && (
        <Link
          to={`/mate/${mate.board.boardId}`}
          style={{ textDecoration: "none" }}
          state={{ user, fromMypage, category }}
        >
          <ItemContainer>
            {mate.fullFlag ? (
              <DealStatusOrange>모집완료</DealStatusOrange>
            ) : (
              <DealStatusGreen>모집중</DealStatusGreen>
            )}
            <ItemTitle>
              <MatchTitle>
                {matchDetail.homeTeamName} vs {matchDetail.awayTeamName}
              </MatchTitle>
              <MatchTime>
                {formatDateTime(matchDetail.matchAt)} 경기 ⚽
              </MatchTime>
            </ItemTitle>
            <TitleComponent>{mate.board.title}</TitleComponent>
            <ItemContent>
              <p>{mate.board.content}</p>
            </ItemContent>
            <ItemInfoSection>
              <MateItemCreated>
                {formatRelativeTime(mate.board.createAt)}
              </MateItemCreated>
            </ItemInfoSection>
          </ItemContainer>
        </Link>
      )}
    </div>
  );
}

export default MateItemCard;
