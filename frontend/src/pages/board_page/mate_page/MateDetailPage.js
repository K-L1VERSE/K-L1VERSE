import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const [mateId, setMateId] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* mate 상세 정보 가져오기 */
  function getMateDetail() {
    console.log(boardId);
    axios
      .get(`/mates/${boardId}`)
      .then(({ data }) => {
        console.log("received data");
        setMateDetail(data.board);
        setMateId(data.mateId);
      })
      .catch((err) => {
        console.log("Mate 상세 정보를 불러오는 중 에러 발생:", err);
      });
  }

  useEffect(() => {
    getMateDetail();
  }, [boardId]);

  function handleUpdateBtn() {
    navigate("/mateRegist", { state: { boardId: mateDetail.boardId } });
  }

  return (
    <div>
      <BoardTopNavBar />
      <h1>Mate 상세 정보</h1>
      <p>
        <strong>Title:</strong> {mateDetail.title}
      </p>
      <p>
        <strong>Content:</strong> {mateDetail.content}
      </p>
      <div onClick={() => handleUpdateBtn()}>수정하기</div>
    </div>
  );
}

export default MateDetailPage;
