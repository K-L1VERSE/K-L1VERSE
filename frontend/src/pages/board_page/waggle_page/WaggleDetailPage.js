import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import CommentList from "../../../components/Board/CommentList"; // 추가

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* waggle 상세 정보 가져오기 */
  function getWaggleDetail() {
    axios
      .get(`/waggles/${boardId}`)
      .then(({ data }) => {
        setWaggleDetail(data.board);
        setWaggleId(data.waggleId);
      })
      .catch((err) => {
        console.log("Waggle 상세 정보를 불러오는 중 에러 발생:", err);
      });
  }

  useEffect(() => {
    getWaggleDetail();
  }, [boardId]);

  function handleUpdateBtn() {
    navigate("/waggleRegist", { state: { boardId: waggleDetail.boardId } });
  }

  return (
    <div>
      <BoardTopNavBar />
      <h1>Waggle 상세 정보</h1>
      <p>
        <strong>Title:</strong> {waggleDetail.title} {waggleId}
      </p>
      <p>
        <strong>Content:</strong> {waggleDetail.content}
      </p>
      <div onClick={() => handleUpdateBtn()}>수정하기</div>

      {/* 댓글 목록을 표시하는 컴포넌트 추가 */}
      <CommentList boardId={boardId} />
    </div>
  );
}

export default WaggleDetailPage;
