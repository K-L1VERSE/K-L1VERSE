import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { useRecoilState } from "recoil";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Button,
  Container,
  Content,
  DetailBox,
  User,
  WaggleDetailBox,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { deleteMate } from "../../../api/mate";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../../styles/BoardStyles/ProductListStyle";
import {
  MatchTime,
  MatchTitle,
  MateDetailContent,
  MateDetailTitle,
  MateDetailTotal,
} from "../../../styles/BoardStyles/MateListStyle";
import { getMatchDetail } from "../../../api/match";
import { ItemTitle } from "../../../styles/BoardStyles/BoardStyle";
import { formatDateTime } from "../../../components/board/dateFormat";
import { UserState } from "../../../global/UserState";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const [matchId, setMatchId] = useState(0);
  const [total, setTotal] = useState(0);
  const [fullFlag, setFullFlag] = useState(false);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [matchDetail, setMatchDetail] = useState({});
  const { userId } = useRecoilState(UserState)[0];

  /* mate 상세 정보 가져오기 */
  function getMateDetail() {
    axios.get(`/board/mates/${boardId}`).then(({ data }) => {
      console.log("!!!!!!!!!!!!", data);
      setMatchId(data.matchId);
      setMateDetail(data.board);
      setTotal(data.total);
      setFullFlag(data.fullFlag);
    });
  }

  useEffect(() => {
    getMateDetail();
  }, [boardId]);

  function getMatch() {
    getMatchDetail(matchId).then((res) => {
      setMatchDetail(res);
    });
  }
  useEffect(() => {
    getMatch();
  }, []);

  const handleUpdateBtn = () => {
    navigate("/mateRegist", { state: { board: mateDetail } });
  };

  const handleDeleteBtn = () => {
    deleteMate(
      boardId,
      () => {
        navigate("/mate");
      },
      () => {},
    );
  };

  const renderEditDeleteButtons = () => {
    if (userId === mateDetail.userId) {
      return (
        <>
          <Button type="button" onClick={handleUpdateBtn}>
            수정
          </Button>
          <Button type="button" onClick={handleDeleteBtn}>
            삭제
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <Container>
      <BoardTopNavBar />
      <DetailBox>
        <User>{mateDetail.nickname}</User>
        {fullFlag ? (
          <DealStatusOrange>모집완료</DealStatusOrange>
        ) : (
          <DealStatusGreen>모집중</DealStatusGreen>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <ItemTitle>
            <MatchTitle>
              {matchDetail.homeTeamName} vs {matchDetail.awayTeamName}
            </MatchTitle>
            <MatchTime>{formatDateTime(matchDetail.matchAt)}</MatchTime>
          </ItemTitle>
        </div>
        <MateDetailContent>{mateDetail.content}</MateDetailContent>
        <MateDetailTotal>총 인원 : {total}</MateDetailTotal>
        {renderEditDeleteButtons()}
      </DetailBox>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default MateDetailPage;
