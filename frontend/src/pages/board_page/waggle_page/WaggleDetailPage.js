import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

function WaggleDetailPage() {
  const [waggleDetail, setWaggleDetail] = useState({});
  const { boardId } = useParams();

  /* waggle 상세 정보 가져오기 */
  function getWaggleDetail() {
    return axios
      .get(`/waggle/${boardId}`)
      .then(({ data }) => {
        console.log("data", data);
        setWaggleDetail(data);
        return data; // 체이닝을 위해 데이터를 반환
      })
      .catch((err) => {
        console.log("Waggle 상세 정보를 불러오는 중 에러 발생:", err);
        throw err; // 체이닝을 위해 에러를 다시 던집니다.
      });
  }

  useEffect(() => {
    console.log(`boardId: ${boardId}`);
    getWaggleDetail()
      .then((data) => {
        console.log("got waggle detail:", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardId]);

  return (
    <div>
      <BoardTopNavBar />
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
