import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const { boardId } = useParams();

  /* waggle 상세 정보 가져오기 */
  const getWaggleDetail = () => {
    axios
      .get(`/waggle/${boardId}`)
      .then(({ data }) => {
        setWaggleDetail(data);
      })
      .catch((err) => {
        console.log("Waggle 상세 정보를 불러오는 중 에러 발생:", err);
      });
  };

  useEffect(() => {
    getWaggleDetail();
  }, [boardId]); // board_id가 변경될 때마다 useEffect 실행

  return (
    <div>
      <h1>Waggle 상세 정보</h1>
      <p>
        <strong>Title:</strong> {waggleDetail.title}
      </p>
      <p>
        <strong>Content:</strong> {waggleDetail.content}
      </p>
    </div>
  );
}

export default WaggleDetailPage;
