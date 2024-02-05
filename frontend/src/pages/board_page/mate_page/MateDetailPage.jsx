import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Button,
  Container,
  Content,
  User,
  WaggleDetailBox,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";
import { deleteMate } from "../../../api/mate";
import { Title } from "../../../styles/BoardStyles/BoardTopNavbarStyle";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();
  const {} = useRecoilState(UserState)[0];

  /* mate 상세 정보 가져오기 */
  function getMateDetail() {
    axios.get(`/board/mates/${boardId}`).then(({ data }) => {
      setMateDetail(data.board);
    });
  }

  useEffect(() => {
    getMateDetail();
  }, [boardId]);

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

  // const handleKeyDown = (event, clickHandler) => {
  //   if (event.key === "Enter") {
  //     clickHandler();
  //   }
  // };

  return (
    <Container>
      <BoardTopNavBar />
      <WaggleDetailBox>
        <User>{mateDetail.nickname}</User>
        <Title>{mateDetail.title}</Title>
        <Content>{mateDetail.content}</Content>
      </WaggleDetailBox>

      <Button type="button" onClick={handleUpdateBtn}>
        수정
      </Button>
      <Button type="button" onClick={handleDeleteBtn}>
        삭제
      </Button>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default MateDetailPage;
