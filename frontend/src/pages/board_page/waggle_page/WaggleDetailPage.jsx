import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import { updateWaggle } from "../../../api/waggle";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Container,
  WaggleDetailBox,
  Title,
  Content,
  Button,
  LikeButton,
  LikeCount,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { nickname } = useRecoilState(UserState)[0];

  function getWaggleDetail() {
    axios.get(`/board/waggles/${boardId}`).then(({ data }) => {
      setWaggleDetail(data.board);
      setWaggleId(data.waggleId);
      setIsLiked(data.isLiked);
      setLikeCount(data.likeCount);
    });
  }

  useEffect(() => {
    getWaggleDetail();
  }, [boardId]);

  const handleUpdateBtn = () => {
    updateWaggle(waggleDetail)
      .then(() => {
        navigate(`/waggle/${boardId}`);
      })
      .catch((error) => {
        console.error("Error in handleUpdateBtn:", error);
      });
  };

  const handleDeleteBtn = async () => {
    try {
      await axios.delete(`/board/waggles/${boardId}`);
      navigate("/waggle");
    } catch (error) {
      console.error("글 삭제 중 에러 발생:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await axios.delete(`/board/waggles/like/${waggleId}`);
        setIsLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        const response = await axios.post(`/board/waggles/like/${waggleId}`);
        setIsLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
        // 응답이 정상적으로 반환되었는지 확인 후 출력
        if (response && response.data) {
          console.log("좋아요 응답:", response.data);
        } else {
          console.error("좋아요 응답이 올바르지 않습니다.");
        }
      }
    } catch (error) {
      console.error("좋아요 처리 중 에러 발생:", error);
    }
  };

  return (
    <Container>
      <BoardTopNavBar />
      <WaggleDetailBox>
        {nickname}
        <Title>{waggleDetail.title}</Title>
        <Content>{waggleDetail.content}</Content>
        {/* 좋아요 버튼 및 개수 표시 */}
        <div>
          <LikeButton onClick={handleLikeClick}>
            {isLiked ? "♥︎" : "♡"}
          </LikeButton>
          <LikeCount>좋아요 {likeCount}개</LikeCount>
        </div>
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

export default WaggleDetailPage;
