import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import CommentList from "../../../components/Board/CommentList";

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // 추가
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* waggle 상세 정보 가져오기 */
  function getWaggleDetail() {
    axios.get(`/waggles/${boardId}`).then(({ data }) => {
      setWaggleDetail(data.board);
      setWaggleId(data.waggleId);
      setIsLiked(data.isLiked);
      setLikeCount(data.likeCount); // 좋아요 개수 업데이트
    });
  }

  useEffect(() => {
    getWaggleDetail();
  }, [boardId]);

  function handleUpdateBtn() {
    navigate("/waggleRegist", { state: { boardId: waggleDetail.boardId } });
  }

  const handleDeleteBtn = async () => {
    try {
      await axios.delete(`/waggles/${boardId}`);
      navigate("/waggle");
    } catch (error) {
      // console.error("글 삭제 중 에러 발생:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await axios.delete(`/waggles/like/${waggleId}`);
        setIsLiked(false);
      } else {
        await axios.post(`/waggles/like/${waggleId}`);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("좋아요 처리 중 에러 발생:", error);
    }
  };

  return (
    <div className="container">
      <BoardTopNavBar />
      <div className="waggle-detail-box">
        <p>
          <strong>{waggleDetail.title}</strong>
        </p>
        <p>{waggleDetail.content}</p>
      </div>
      <div onClick={() => handleUpdateBtn()}>수정하기</div>
      <div onClick={() => handleDeleteBtn()}>삭제하기</div>

      {/* 좋아요 버튼 및 개수 표시 */}
      <div>
        <button onClick={handleLikeClick}>{isLiked ? "♥︎" : "♡"}</button>
        <span>좋아요 {likeCount}개</span>
      </div>

      {/* 댓글 목록을 표시하는 컴포넌트 추가 */}
      <CommentList boardId={boardId} />
    </div>
  );
}

export default WaggleDetailPage;
