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
  DetailCommentCount,
  // LikeCount,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";

import BackIcon from "../../../assets/icon/back-icon.png";
import UnlikeIcon from "../../../assets/icon/unlike-icon.png";
import LikeIcon from "../../../assets/icon/like-icon.png";
import { ReactComponent as Comment } from "../../../assets/icon/comment-icon.svg";
import {
  DeleteButton,
  EditButton,
} from "../../../styles/BoardStyles/CommentStyle";
import Like from "../../../components/board/Like";
import {
  WaggleImage,
  WaggleImageContainer,
} from "../../../styles/BoardStyles/WaggleListStyle";

function WaggleDetailPage() {
  const [boardDetail, setBoardDetail] = useState({});
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { userId } = useRecoilState(UserState)[0];

  const getWaggle = () => {
    getWaggleDetail(
      boardId,
      { board: { userId } },
      (res) => {
        setBoardDetail(res.data);
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
    setWaggleId(boardDetail.waggleId);
    setNickname(waggleDetail.nickname);
    setCommentCount(waggleDetail.commentCount);
    setIsLiked(boardDetail.isLiked);
    setLikeCount(boardDetail.likeCount);
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
        waggleId,
        { userId },
        () => {
          setIsLiked(false);
          setLikeCount((prevCount) => prevCount - 1);
        },
        () => {},
      );
    } else {
      likeWaggle(
        waggleId,
        { userId },
        () => {
          setIsLiked(true);
          setLikeCount((prevCount) => prevCount + 1);
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
        <WaggleImageContainer>
          {waggleDetail.boardImage && (
            <WaggleImage src={waggleDetail.boardImage} alt="Waggle Image" />
          )}
        </WaggleImageContainer>
        <Like
          isLiked={isLiked}
          likeCount={likeCount}
          handleLikeClick={handleLikeClick}
        />
        <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton>
      </DetailBox>
      <DetailCommentCount>
        <Comment />
        댓글 수 {commentCount}
      </DetailCommentCount>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default WaggleDetailPage;
