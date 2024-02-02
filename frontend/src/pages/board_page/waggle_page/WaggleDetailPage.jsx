import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import {
  deleteWaggle,
  likeWaggle,
  unlikeWaggle,
  updateWaggle,
} from "../../../api/waggle";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Container,
  WaggleDetailBox,
  User,
  Title,
  Content,
  Button,
  LikeButton,
  LikeCount,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";

import UnlikeIcon from "../../../assets/icon/unlike-icon.png";
import LikeIcon from "../../../assets/icon/like-icon.png";

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { userId, nickname } = useRecoilState(UserState)[0];

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
    updateWaggle(waggleDetail, boardId).then(() => {
      navigate(`/waggle/${boardId}`);
    });
  };

  const handleDeleteBtn = () => {
    deleteWaggle(boardId);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      unlikeWaggle(
        { userId },
        waggleId,
        () => {
          setIsLiked(false);
          setLikeCount((prevCount) => prevCount - 1);
        },
        () => {},
      );
    } else {
      likeWaggle(
        { userId },
        waggleId,
        () => {
          setIsLiked(true);
          setLikeCount((prevCount) => prevCount + 1);
        },
        () => {},
      );
    }
  };

  return (
    <Container>
      <BoardTopNavBar />
      <WaggleDetailBox>
        <User>{nickname}</User>
        <Title>{waggleDetail.title}</Title>
        <Content>{waggleDetail.content}</Content>
        {/* 좋아요 버튼 및 개수 표시 */}
        <div>
          <LikeButton onClick={handleLikeClick}>
            <img
              src={isLiked ? UnlikeIcon : LikeIcon}
              alt={isLiked ? "Unlike" : "Like"}
              style={{ width: "24px", height: "24px" }}
            />
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
