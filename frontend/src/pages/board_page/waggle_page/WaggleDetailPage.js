import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import CommentList from "../../../components/Board/CommentList";
import CommentForm from "../../../components/Board/CommentForm";

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const [waggleId, setWaggleId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // 추가
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* waggle 상세 정보 가져오기 */
  function getWaggleDetail() {
    axios
      .get(`/waggles/${boardId}`)
      .then(({ data }) => {
        setWaggleDetail(data.board);
        setWaggleId(data.waggleId);
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount); // 좋아요 개수 업데이트
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

  const handleDeleteBtn = async () => {
    try {
      await axios.delete(`/waggles/${boardId}`);
      // 삭제 후, 어떤 화면으로 이동할지 결정
      // 예: 삭제 후에 게시판 목록으로 이동하거나, 홈 화면으로 이동하는 등
      navigate("/waggle"); // 수정 필요
    } catch (error) {
      console.error("글 삭제 중 에러 발생:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = isLiked
        ? await axios.delete(`/waggles/like/${waggleDetail.board.waggleId}`)
        : await axios.post(`/waggles/like/${waggleDetail.board.waggleId}`);

      console.log("Like response:", response); // 추가

      setIsLiked(!isLiked);
      setWaggleDetail(response.data.board);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("좋아요 처리 중 에러 발생:", error);
      console.log("Error response:", error.response); // 추가
    }
  };

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
      <div onClick={() => handleDeleteBtn()}>삭제하기</div>

      {/* 좋아요 버튼 및 개수 표시 */}
      <div>
        <button onClick={handleLikeClick}>{isLiked ? "♡" : "♥︎"}</button>
        <span>좋아요 {likeCount}개</span>
      </div>

      {/* 댓글 목록을 표시하는 컴포넌트 추가 */}
      <CommentList boardId={boardId} />
    </div>
  );
}

export default WaggleDetailPage;
