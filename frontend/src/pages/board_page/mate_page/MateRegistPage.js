import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";

function MateRegistPage() {
  const navigate = useNavigate();
  const { mateId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    // mateId 제공되는 경우, 수정 모드임을 나타냄
    if (mateId) {
      // 기존 mate 게시물을 가져와서 폼을 채움
      axios
        .get(`/mates/${mateId}`)
        .then(({ data }) => {
          setTitle(data.title);
          setContent(data.content);
          setIsUpdateMode(true);
        })
        .catch((error) => {
          console.error("Mate 게시물을 불러오는 중 에러 발생:", error);
        });
    }
  }, [mateId, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isUpdateMode) {
        // 기존 mate 게시물을 업데이트
        await axios.post(`/mates/${mateId}`, { title, content });
        console.log("Mate 게시물 수정 성공!");
      } else {
        // 새로운 mate 게시물 생성
        await axios.post(`/mates`, { title, content });
        console.log("Mate 게시물 작성 성공!");
      }
      // Mate 상세  페이지로 리디렉션
      navigate("/mate/:mateId");
    } catch (error) {
      console.error("Mate 게시물 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h1>{isUpdateMode ? "Mate 게시물 수정" : "Mate 게시물 작성"}</h1>
      <form onSubmit={handleSubmit}>
        제목:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        내용:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">{isUpdateMode ? "수정하기" : "작성하기"}</button>
      </form>
    </div>
  );
}

export default MateRegistPage;
