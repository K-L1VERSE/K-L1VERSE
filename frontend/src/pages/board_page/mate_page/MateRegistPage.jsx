import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";
import MateRegistCard from "../../../components/board/MateRegistCard"; // Import MateRegistCard
import { createMate, updateMate } from "../../../api/mate";
import { UserState } from "../../../global/UserState";
import { DetailTop } from "../../../styles/BoardStyles/BoardCreateStyle";
import BackIcon from "../../../assets/icon/back-icon.png";
import { BackButton } from "../../../styles/BoardStyles/BoardDetailStyle";

function MateRegistPage() {
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [total, setTotal] = useState(1);
  const [fullFlag, setFullFlag] = useState(false);
  const [matchId, setMatchId] = useState(undefined);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { userId } = useRecoilState(UserState)[0];
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (location.state && location.state.board) {
      setBoardId(location.state.board.boardId);
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
      setTotal(location.state.total);
      setFullFlag(location.state.fullFlag);
      setMatchId(location.state.matchId);
      setIsUpdateMode(true);
    }
  }, [location]);

  const handleSubmit = () => {
    if (title.length === 0) {
      alert("제목 없어요");
      return;
    }
    if (content.length === 0) {
      alert("내용 없어요");
      return;
    }
    if (isUpdateMode) {
      updateMate(
        boardId,
        {
          board: {
            title,
            content,
            userId,
          },
          total,
          fullFlag,
          matchId,
        },
        () => {
          if (state && state.fromMypage) {
            navigate(`/mate/${boardId}`, {
              state: {
                user: state.user,
                fromMypage: state.fromMypage,
                category: state.category,
              },
            });
          } else {
            navigate(`/mate/${boardId}`);
          }
        },
        () => {},
      );
    } else {
      createMate(
        {
          board: {
            boardType: "MATE",
            title,
            content,
            userId,
          },
          total,
          fullFlag,
          matchId,
        },
        ({ data }) => {
          console.log("Waggle created");
          navigate(`/mate/${data.board.boardId}`);
        },
        () => {},
      );
    }
  };

  function handleFullFlagChange(e) {
    setFullFlag(e.target.checked);
  }

  const handleFullFlag = () => {
    if (isUpdateMode) {
      setFullFlag(!fullFlag);
    } else {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">작성중에는 변경할 수 없어요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
    }
  };

  const handleBackClick = () => {
    if (isUpdateMode) {
      if (state && state.fromMypage) {
        navigate(`/mate/${boardId}`, {
          state: {
            user: state.user,
            fromMypage: state.fromMypage,
            category: state.category,
          },
        });
      } else {
        navigate(`/mate/${boardId}`);
      }
    } else {
      navigate("/mate");
    }
  };

  return (
    <>
      <DetailTop>
        <BackButton onClick={handleBackClick}>
          <img src={BackIcon} alt="Back" />
        </BackButton>
        <MateBoardTitle>
          <div>{isUpdateMode ? "직관메이트 글수정" : "직관메이트 글쓰기"}</div>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Call%20Me%20Hand%20Medium-Light%20Skin%20Tone.png"
            alt="Call Me Hand Medium-Light Skin Tone"
            width="18"
            height="18"
          />
        </MateBoardTitle>
      </DetailTop>

      <MateRegistCard
        title={title}
        content={content}
        total={total}
        fullFlag={fullFlag}
        matchId={matchId}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onTotalChange={(e) => {
          const val = e.target.value;
          setTotal(val.replace(/\D/g, ""));
        }}
        onfullFlag={fullFlag}
        onMatchIdChange={(value) => setMatchId(value)}
        onSubmit={handleSubmit}
        buttonText={isUpdateMode ? "수정하기" : "작성하기"}
        handleFullFlag={handleFullFlag}
        isUpdateMode={isUpdateMode}
      />
    </>
  );
}

export default MateRegistPage;

export const MateBoardTitle = styled.div`
  display: flex;
  font-family: "Pretendard-Bold";
  margin: 0 auto;
  margin-bottom: 1rem;
  background-color: #e3faef;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  align-items: center;
  color: #16b368;
  font-size: 0.85rem;

  img {
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
  }

  /* display: flex;
  width: 9rem;
  height: 1.7rem;
  font-family: "Pretendard-Bold";
  margin: 0 auto;
  font-size: 1rem;
  background-color: #e3faef;
  padding: 0.2rem 0.2rem 0.15rem 0.7rem;
  border-radius: 10px;
  align-items: center;
  color: #16b368;
  margin-bottom: 1rem; */
`;
