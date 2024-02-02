import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const [, setMateId] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* mate 상세 정보 가져오기 */
  function getMateDetail() {
    axios.get(`/board/mates/${boardId}`).then(({ data }) => {
      setMateDetail(data.board);
      setMateId(data.mateId);
    });
  }

  useEffect(() => {
    getMateDetail();
  }, [boardId]);

  function handleUpdateBtn() {
    navigate("/mateRegist", { state: { boardId: mateDetail.boardId } });
  }

  const handleDeleteBtn = async () => {
    try {
      await axios.delete(`/board/mates/${boardId}`);
      navigate("/mate");
    } catch (error) {
      // console.error("글 삭제 중 에러 발생:", error);
    }
  };

  const handleKeyDown = (event, clickHandler) => {
    if (event.key === "Enter") {
      clickHandler();
    }
  };

  return (
    <div className="container">
      <BoardTopNavBar />
      <h1>Mate 상세 정보</h1>
      <div className="mate-detail-box">
        <p>
          <strong>{mateDetail.title}</strong>
        </p>
        <p>{mateDetail.content}</p>
      </div>
      <button
        type="button"
        onClick={handleUpdateBtn}
        onKeyDown={(e) => handleKeyDown(e, handleUpdateBtn)}
      >
        수정하기
      </button>
      <button
        type="button"
        onClick={handleDeleteBtn}
        onKeyDown={(e) => handleKeyDown(e, handleDeleteBtn)}
      >
        삭제하기
      </button>

      <CommentList boardId={boardId} />
    </div>
  );
}

export default MateDetailPage;
