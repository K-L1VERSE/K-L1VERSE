import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  DetailBox,
  DetailTop,
  BackButton,
  EditDeleteButton,
  DetailCommentCount,
  CreateAt,
  // LikeCount,
  UserContainer,
  UserProfile,
  UserBadge,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";

import BackIcon from "../../../assets/icon/back-icon.png";
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
import { formatDateTime2 } from "../../../components/board/dateFormat";

function WaggleDetailPage() {
  const [boardDetail, setBoardDetail] = useState({});
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { userId } = useRecoilState(UserState)[0];

  const location = useLocation();
  const { state } = location;

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
    setCreateAt(waggleDetail.createAt);
    setCommentCount(waggleDetail.commentCount);
    setLiked(boardDetail.liked);
    setLikesCount(boardDetail.likesCount);
  }, [waggleDetail]);

  const handleUpdateBtn = () => {
    if (state && state.fromMypage) {
      navigate(`/waggleRegist`, {
        state: {
          board: waggleDetail,
          user: state.user,
          fromMypage: state.fromMypage,
          category: state.category,
        },
      });
    } else {
      navigate(`/waggleRegist`, {
        state: {
          board: waggleDetail,
        },
      });
    }
  };

  const handleDeleteBtn = () => {
    deleteWaggle(
      boardId,
      () => {
        if (state && state.fromMypage) {
          navigate("/mypage", {
            state: {
              user: state.user,
              category: state.category,
            },
          });
        } else {
          navigate("/waggle");
        }
      },
      () => {},
    );
  };

  const handleLikeClick = () => {
    if (liked) {
      unlikeWaggle(
        waggleId,
        { userId },
        () => {
          setLiked(false);
          setLikesCount((prevCount) => prevCount - 1);
        },
        () => {},
      );
    } else {
      likeWaggle(
        waggleId,
        { userId },
        () => {
          setLiked(true);
          setLikesCount((prevCount) => prevCount + 1);
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
    if (state && state.fromMypage) {
      navigate("/mypage", {
        state: {
          user: state.user,
          category: state.category,
        },
      });
    } else {
      navigate("/waggle");
    }
  };

  return (
    <div>
      {waggleDetail && waggleId && (
        <Container>
          <DetailTop>
            <BackButton onClick={handleBackClick}>
              <img src={BackIcon} alt="Back" />
            </BackButton>
          </DetailTop>
          <DetailBox>
            <UserContainer>
              <UserProfile src={waggleDetail.profile} />
              <User>{nickname}</User>
              <UserBadge
                src={`${process.env.PUBLIC_URL}/badge/badge${waggleDetail.mainBadge === null ? 0 : waggleDetail.mainBadge}back.png`}
              />
            </UserContainer>
            <CreateAt>{formatDateTime2(createAt)}</CreateAt>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <WaggleImageContainer>
              {waggleDetail.boardImage &&
                waggleDetail.boardImage
                  .split(",")
                  .map((imageUrl, index) => (
                    <WaggleImage
                      key={index}
                      src={imageUrl.trim()}
                      alt={`Waggle Image ${index}`}
                    />
                  ))}
            </WaggleImageContainer>
            <Like
              liked={liked}
              likesCount={likesCount}
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
      )}
    </div>
  );
}

export default WaggleDetailPage;
