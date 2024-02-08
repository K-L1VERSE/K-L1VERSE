import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  deleteWaggle,
  getWaggleDetail,
  likeCount,
  likeWaggle,
  unlikeWaggle,
} from "../../../api/waggle";
import CommentList from "../../../components/board/CommentList";
import {
  Container,
  User,
  Title,
  Content,
  LikeButton,
  LikeCount,
  DetailBox,
  DetailTop,
  BackButton,
  EditDeleteButton,
  // LikeCount,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";

import BackIcon from "../../../assets/icon/back-icon.png";
import UnlikeIcon from "../../../assets/icon/unlike-icon.png";
import LikeIcon from "../../../assets/icon/like-icon.png";
import {
  DeleteButton,
  EditButton,
} from "../../../styles/BoardStyles/CommentStyle";

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { userId } = useRecoilState(UserState)[0];

  const getWaggle = () => {
    getWaggleDetail(
      boardId,
      { board: { userId } },
      (res) => {
        setWaggleDetail(res.data.board);
      },
      () => {},
    );
  };

  useEffect(() => {
    getWaggle();
  }, [boardId]);

  useEffect(() => {
    setTitle(waggleDetail.title);
    setContent(waggleDetail.content);
    setNickname(waggleDetail.nickname);
  }, [waggleDetail]);

  const handleUpdateBtn = () => {
    navigate(`/waggleRegist`, {
      state: {
        board: waggleDetail,
      },
    });
  };

  const handleDeleteBtn = () => {
    deleteWaggle(
      boardId,
      () => {
        navigate("/waggle");
      },
      () => {},
    );
  };

  const handleLikeClick = () => {
    if (isLiked) {
      unlikeWaggle(
        { userId },
        waggleId,
        () => {
          setIsLiked(false);
          // setLikeCount((prevCount) => prevCount - 1);
        },
        () => {},
      );
    } else {
      likeWaggle(
        { userId },
        waggleId,
        () => {
          setIsLiked(true);
          // setLikeCount((prevCount) => prevCount + 1);
        },
        () => {},
      );
    }
  };

  const renderEditDeleteButtons = () => {
    if (userId === waggleDetail.userId) {
      return (
        <>
          <EditButton type="button" onClick={handleUpdateBtn}>
            수정
          </EditButton>
          <DeleteButton type="button" onClick={handleDeleteBtn}>
            삭제
          </DeleteButton>
        </>
      );
    }
    return null;
  };

  const handleBackClick = () => {
    navigate("/waggle");
  };

  return (
    <Container>
      <DetailTop>
        <BackButton onClick={handleBackClick}>
          <img src={BackIcon} alt="Back" />
        </BackButton>
      </DetailTop>
      <DetailBox>
        <User>{nickname}</User>
        <Title>{title}</Title>
        <Content>{content}</Content>
        {/* {waggleDetail.boardImage && (
          <img
            src={waggleDetail.boardImage}
            alt="Waggle Image"
            style={{ maxWidth: "100%", maxHeight: "400px", margin: "20px 0" }}
          />
        )} */}
        <div>
          <LikeButton onClick={handleLikeClick}>
            <img
              src={isLiked ? LikeIcon : UnlikeIcon}
              alt={isLiked ? "Like" : "Unlike"}
              style={{ width: "20px", height: "20px" }}
            />
          </LikeButton>
          <LikeCount>좋아요 {likeCount}개</LikeCount>
        </div>
        <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton>
      </DetailBox>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default WaggleDetailPage;
