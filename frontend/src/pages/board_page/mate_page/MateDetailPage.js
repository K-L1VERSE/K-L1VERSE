import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import CommentList from "../../../components/Board/CommentList";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const [, setMateId] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* mate 상세 정보 가져오기 */
  function getMateDetail() {
    console.log(boardId);
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
      await axios.delete(`/board/waggles/${boardId}`);
      navigate("/waggle");
    } catch (error) {
      // console.error("글 삭제 중 에러 발생:", error);
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
      <div onClick={() => handleUpdateBtn()}>수정하기</div>
      <div onClick={() => handleDeleteBtn()}>삭제하기</div>

      <CommentList boardId={boardId} />
    </div>
  );
}

export default MateDetailPage;
