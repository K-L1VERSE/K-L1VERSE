import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import RegistCard from "../../../components/board/WaggleRegistCard";
import { createWaggle, updateWaggle } from "../../../api/waggle";
import { UserState } from "../../../global/UserState";

import { DetailTop } from "../../../styles/BoardStyles/BoardCreateStyle";
import { BackButton } from "../../../styles/BoardStyles/BoardDetailStyle";
import BackIcon from "../../../assets/icon/back-icon.png";

function WaggleRegistPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [boardId, setBoardId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardImage, setBoardImage] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { userId } = useRecoilState(UserState)[0];
  const [file] = useState(null);

  useEffect(() => {
    if (location.state && location.state.board) {
      setBoardId(location.state.board.boardId);
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
      setBoardImage(location.state.board.boardImage);
      setIsUpdateMode(true);
    }
  }, [location]);

  const handleSubmit = () => {
    if (title.length === 0) {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">제목을 입력해주세요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
      return;
    }
    if (content.length === 0) {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">내용을 입력해주세요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
      return;
    }

    if (isUpdateMode) {
      updateWaggle(
        boardId,
        {
          board: {
            title,
            content,
            boardImage,
          },
        },
        () => {
          if (state && state.fromMypage) {
            navigate(`/waggle/${boardId}`, {
              state: {
                user: state.user,
                fromMypage: state.fromMypage,
                category: state.category,
              },
            });
          } else {
            navigate(`/waggle/${boardId}`);
          }
        },
        () => {},
      );
    } else {
      createWaggle(
        {
          board: {
            boardType: "WAGGLE",
            title,
            content,
            userId,
            boardImage,
          },
        },
        ({ data }) => {
          navigate(`/waggle/${data.board.boardId}`);
        },
        () => {},
      );
    }
  };

  const handleBackClick = () => {
    if (isUpdateMode) {
      if (state && state.fromMypage) {
        navigate(`/waggle/${boardId}`, {
          state: {
            user: state.user,
            fromMypage: state.fromMypage,
            category: state.category,
          },
        });
      } else {
        navigate(`/waggle/${boardId}`);
      }
    } else {
      navigate("/waggle");
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      setBoardImage(file);
    }
  };
  useEffect(() => {
    handleFileChange(file);
  }, [file]);

  return (
    <>
      <DetailTop>
        <BackButton onClick={handleBackClick}>
          <img src={BackIcon} alt="Back" />
        </BackButton>
        <WaggleBoardTitle>
          <div>{isUpdateMode ? "와글와글 수정" : "와글와글 글쓰기"}</div>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Big%20Eyes.png"
            alt="Grinning Face with Big Eyes"
            width="18"
            height="18"
          />
        </WaggleBoardTitle>
      </DetailTop>
      <RegistCard
        title={title}
        content={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        boardImage={boardImage}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        buttonText={isUpdateMode ? "수정하기" : "작성하기"}
        setBoardImage={setBoardImage}
      />
    </>
  );
}

export default WaggleRegistPage;

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
