import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const { boardId } = useParams();

  /* mate 상세 정보 가져오기 */
  const getMateDetail = () => {
    axios
      .get(`/mates/${boardId}`)
      .then(({ data }) => {
        setMateDetail(data);
      })
      .catch((err) => {
        console.log("Waggle 상세 정보를 불러오는 중 에러 발생:", err);
      });
  };

  useEffect(() => {
    getMateDetail();
  }, [boardId]); // board_id가 변경될 때마다 useEffect 실행

  return (
    <div>
      <h1>Mate 상세 정보</h1>
      <p>
        <strong>Title:</strong> {mateDetail.title}
      </p>
      <p>
        <strong>Content:</strong> {mateDetail.content}
      </p>
    </div>
  );
}

export default MateDetailPage;
