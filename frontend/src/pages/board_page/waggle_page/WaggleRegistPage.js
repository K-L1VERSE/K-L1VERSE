import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../../api/axios";

function WaggleRegistPage() {
  const navigate = useNavigate();
  const { waggleId, boardId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    // waggleId가 제공되는 경우, 수정 모드임을 나타냄
    if (waggleId) {
      // 기존 waggle 게시물을 가져와서 폼을 채움
      axios
        .get(`/waggles/${waggleId}`)
        .then(({ data }) => {
          setTitle(data.title);
          setContent(data.content);
          setIsUpdateMode(true);
        })
        .catch((error) => {
          console.error("Waggle 게시물을 불러오는 중 에러 발생:", error);
        });
    }
  }, [waggleId, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        board: {
          boardType: "WAGGLE",
          title: title,
          content: content,
        },
      };

      if (isUpdateMode) {
        // 기존 waggle 게시물 업데이트
        await axios.put(`/waggle/${waggleId}`, requestData);
        console.log("Waggle 게시물 수정 성공!");
      } else {
        // 새로운 waggle 게시물 생성
        await axios.post(`/waggle`, requestData);
        console.log("Waggle 게시물 작성 성공!");
      }

      // Waggle 상세 페이지로 리디렉션
      navigate(`/waggle/${boardId}`);
    } catch (error) {
      console.error("Waggle 게시물 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h1>{isUpdateMode ? "Waggle 게시물 수정" : "Waggle 게시물 작성"}</h1>
      <form onSubmit={handleSubmit}>
        <br />
        제목:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          //   onChange={function (e) {
          //     setTitle(e.target.value);
          //   }}
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

export default WaggleRegistPage;
