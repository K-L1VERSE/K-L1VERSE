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
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Container,
  User,
  Title,
  Content,
  Button,
  LikeButton,
  LikeCount,
  DetailBox,
  // LikeCount,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { UserState } from "../../../global/UserState";

import UnlikeIcon from "../../../assets/icon/unlike-icon.png";
import LikeIcon from "../../../assets/icon/like-icon.png";

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
      // ({ data }) => {
      //   setWaggleDetail(data);
      //   console.log("data 입니다", data);
      // },
      (res) => {
        setWaggleDetail(res.data.board);
        // console.log(waggleDetail);
        // console.log("data 입니다", res.data.board);
      },
      () => {},
    );
  };

  useEffect(() => {
    console.log("이건 되고있나?", boardId);
    getWaggle();
    console.log("이건 가나? 응 안가", waggleDetail);
  }, [boardId]);

  // useEffect(() => {
  //   getWaggle();
  // }, [boardId]);

  useEffect(() => {
    console.log("이건 가나???????????????", waggleDetail);
    setTitle(waggleDetail.title);
    setContent(waggleDetail.content);
    setNickname(waggleDetail.nickname);
    console.log("***********", title);
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
        {/* <User>{waggleDetail.board.nickname}</User>
        <Title>{waggleDetail.board.title}</Title>
        <Content>{waggleDetail.board.content}</Content> */}
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
        {renderEditDeleteButtons()}
      </DetailBox>

      <CommentList boardId={boardId} />
    </Container>
  );
}

export default WaggleDetailPage;
