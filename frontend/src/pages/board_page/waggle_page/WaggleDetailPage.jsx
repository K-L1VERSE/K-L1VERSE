import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  deleteWaggle,
  getWaggleDetail,
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
  UserContainer,
  UserProfile,
  UserBadge,
  Gray,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";

import BackIcon from "../../../assets/icon/back-icon.png";
import {
  DeleteButton,
  EditButton,
} from "../../../styles/BoardStyles/CommentStyle";
import Like from "../../../components/board/Like";
import {
  WaggleImageWrapper,
  WaggleImageTest,
} from "../../../styles/BoardStyles/WaggleListStyle";
import { formatDateTime2 } from "../../../components/board/dateFormat";
import Modal from "../../../components/common/Modal";

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

  const [modalVisible, setModalVisible] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState("");

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
    Swal.fire({
      html: `
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Bear.png" alt="Bear" width="100" height="100"/>
        <div style='font-size:1.2rem; font-family:Pretendard-Bold;'>게시글을 삭제하시겠습니까?</div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>삭제</div>",
      cancelButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>취소</div>",
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
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

  const handleImageClick = (imageUrl) => {
    setClickedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const highlightHashtags = (text) => {
    return text.split(/(#\S+)/).map((word, index) =>
      word.startsWith("#") ? (
        <span
          key={index}
          style={{
            color: "#1D24CA",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          {word}
        </span>
      ) : (
        word
      ),
    );
  };

  return (
    <div>
      {waggleDetail && waggleId && (
        <Container>
          <DetailTop>
            <BackButton onClick={handleBackClick}>
              <img src={BackIcon} alt="Back" />
            </BackButton>
            <WaggleBoardTitle>
              <div>와글와글 &nbsp;</div>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Big%20Eyes.png"
                alt="Grinning Face with Big Eyes"
                width="18"
                height="18"
              />
            </WaggleBoardTitle>
          </DetailTop>
          <DetailBox>
            <Title>{title}</Title>
            <UserContainer>
              <UserProfile src={waggleDetail.profile} />
              <User>{nickname}</User>
              <UserBadge
                src={`${process.env.PUBLIC_URL}/badge/badge${waggleDetail.mainBadge === null ? 0 : waggleDetail.mainBadge}back.png`}
              />
            </UserContainer>
            <ForSpaceBetween>
              <CreateAt>
                <div>{formatDateTime2(createAt)}</div>
              </CreateAt>
              <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton>
            </ForSpaceBetween>
            <Content>{highlightHashtags(content)}</Content>
            <WaggleImageWrapper>
              {waggleDetail.boardImage &&
                waggleDetail.boardImage
                  .split(",")
                  .map((imageUrl, index) => (
                    <WaggleImageTest
                      key={index}
                      src={imageUrl.trim()}
                      alt={`Waggle Image ${index}`}
                      onClick={() => handleImageClick(imageUrl.trim())}
                    />
                  ))}
            </WaggleImageWrapper>
            <Bottom>
              <DetailCommentCount>
                <div>
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png"
                    alt="Love Letter"
                    width="25"
                    height="25"
                  />
                  댓글 수 {commentCount}
                </div>
              </DetailCommentCount>
              <Like
                liked={liked}
                likesCount={likesCount}
                handleLikeClick={handleLikeClick}
              />
            </Bottom>
            <Gray />
          </DetailBox>
          <CommentList
            boardId={boardId}
            writerId={waggleDetail.userId}
            setCommentCount={setCommentCount}
          />
        </Container>
      )}
      <Modal visible={modalVisible} onClose={handleCloseModal}>
        <img src={clickedImageUrl} alt="Modal Image" />
      </Modal>
    </div>
  );
}

export default WaggleDetailPage;

export const WaggleBoardTitle = styled.div`
  display: flex;
  font-family: "Pretendard-Bold";
  margin: 0 auto;
  margin-bottom: 1rem;
  background-color: #fee8de;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  align-items: center;
  color: #f07e3d;
  font-size: 0.85rem;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const ForSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.3px solid #ccc;
  margin-bottom: 0.2rem;
`;
