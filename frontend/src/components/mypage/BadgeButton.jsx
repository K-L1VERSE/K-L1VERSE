import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "../../api/authAxios";

import { ReactComponent as BadgeBackground } from "../../assets/BadgeBackground.svg";

const BadgeContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  gap: 0.625rem;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const BadgeImage = styled.img`
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
`;

function BadgeButton({ mainBadge }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const badgeCodeList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const [badgeList, setBadgeList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const openModal = () => {
    setIsModalOpen(true);
    const temp = [...badgeList];

    /* axios로 가지고 있는 뱃지 코드 리스트 가져오기 */
    const request = axios
      .get(`/badges`)
      .then((res) => {
        console.log("res=============", res);
        res.data.map((code) => {
          const index = badgeCodeList.indexOf(code);
          console.log("index", index);
          temp[index] = true;
        });
        setBadgeList(temp);
        console.log("after===", badgeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const goBadge = () => {
    navigate("/badge");
  };

  const handleBuyBadge = (index) => {
    const confirmPurchase = window.confirm("뱃지를 구매하시겠습니까?");

    if (confirmPurchase) {
      /* axios로 뱃지 구매 코드 보내기 */
      const request = axios
        .post(`/badges`, {
          code: badgeCodeList[index],
        })
        .then((res) => {
          console.log(res);

          if (res.data.code === 1002) {
            alert("포인트가 부족합니다.");
            return;
          } else if (res.data.code === 1200) {
            alert("잘못된 요청입니다.");
            return;
          }

          alert("뱃지 구매가 완료되었습니다.");
          setBadgeList((prevBadgeList) => {
            const newBadgeList = [...badgeList];
            newBadgeList[index] = true;
            return newBadgeList;
          });

          wearBadge(index);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const wearBadge = (index) => {
    const confirmWear = window.confirm("뱃지를 착용하시겠습니까?");

    if (confirmWear) {
      /* axios로 뱃지 착용 코드 보내기 */
      const request = axios
        .post(`/badges/wear`, {
          code: badgeCodeList[index],
        })
        .then((res) => {
          console.log(res);
          alert("뱃지 착용이 완료되었습니다.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log("mainBadge : ", mainBadge);

  return (
    <div>
      <BadgeContainer>
        {/* <BadgeBackground style={{ position: "absolute" }} /> */}
        <BadgeImage
          onClick={goBadge}
          src={`/badge/badge${mainBadge || 0}back.png`}
          style={{ width: "1.8rem", height: "2.2rem" }}
        />
      </BadgeContainer>
    </div>
  );
}

export default BadgeButton;
