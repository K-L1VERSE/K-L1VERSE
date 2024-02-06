import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Button,
  Container,
  Content,
  User,
  WaggleDetailBox,
  Total,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { deleteMate } from "../../../api/mate";
import { Title } from "../../../styles/BoardStyles/BoardTopNavbarStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../../styles/BoardStyles/ProductListStyle";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const [total, setTotal] = useState(0);
  const [fullFlag, setFullFlag] = useState(false);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* mate 상세 정보 가져오기 */
  function getMateDetail() {
    axios.get(`/board/mates/${boardId}`).then(({ data }) => {
      setMateDetail(data.board);
      setTotal(data.total);
      setFullFlag(data.fullFlag);
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
          <Title>{mateDetail.title}</Title>
        </div>
        <Content>{mateDetail.content}</Content>
        <Total>총 인원 : {total}</Total>
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
