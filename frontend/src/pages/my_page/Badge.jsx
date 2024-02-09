import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserState } from "../../global/UserState";

import Swal from "sweetalert2";
import axios from "../../api/axios";

import {
  TitleContainer,
  TitleText,
  ConfirmContainer,
  ConfirmTextContainer,
  ConfirmText,
  PurchaseTextContainer,
  PurchaseText,
  DisabledConfirmContainer,
  DisabledTextContainer,
  DisabledText,
} from "../../styles/mypage-styles/badgeStyle";
import BadgeList from "./BadgeList";

function Badge() {
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

  const badgeNameList = [
    "울산",
    "포항",
    "제주",
    "전북",
    "서울",
    "대전",
    "대구",
    "인천",
    "강원",
    "광주",
    "수원",
    "김천",
  ];

  const [badgeList, setBadgeList] = useState([
    true,
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

  const [selectedBadge, setSelectedBadge] = useState(-1);
  const setUserState = useSetRecoilState(UserState);

  useEffect(() => {
    const temp = [...badgeList];

    /* axios로 가지고 있는 뱃지 코드 리스트 가져오기 */
    axios
      .get(`/user/badges`)
      .then(({ data }) => {
        data.forEach((code) => {
          const index = badgeCodeList.indexOf(code);
          temp[index] = true;
        });
        setBadgeList(temp);
      })
      .catch(() => {});
  }, []);

  const navigate = useNavigate();
  const goMypage = () => {
    navigate("/mypage");
  };

  const wearBadge = (index) => {
    // const confirmWear = window.confirm("뱃지를 착용하시겠습니까?");
    Swal.fire({
      title: "뱃지를 착용하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "착용",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/user/badges/wear`, {
            code: badgeCodeList[index],
          })
          .then(() => {
            Swal.fire("뱃지 착용이 완료되었습니다.");

            setUserState((prev) => ({
              ...prev,
              mainBadge: badgeCodeList[index],
            }));
            // alert("뱃지 착용이 완료되었습니다.");
            goMypage();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "잠시 후 다시 시도해주세요.",
            });
            // alert("잠시 후 다시 시도해주세요.");
          });
      }
    });
  };

  const handleBuyBadge = (index) => {
    // const confirmPurchase = window.confirm("뱃지를 구매하시겠습니까?");

    Swal.fire({
      title: "뱃지를 구매하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "구매",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        /* axios로 뱃지 구매 코드 보내기 */
        axios
          .post(`/user/badges`, {
            code: badgeCodeList[index],
          })
          .then((res) => {
            if (res.data.code === 1002) {
              Swal.fire({
                icon: "error",
                title: "포인트가 부족합니다.",
              });
              // alert("포인트가 부족합니다.");
            } else if (res.data.code === 1200) {
              Swal.fire({
                icon: "error",
                title: "잘못된 요청입니다.",
              });
              // alert("잘못된 요청입니다.");
            } else {
              Swal.fire("뱃지 구매가 완료되었습니다.");
              // alert("뱃지 구매가 완료되었습니다.");
              setBadgeList(() => {
                const newBadgeList = [...badgeList];
                newBadgeList[index] = true;
                return newBadgeList;
              });

              wearBadge(index);
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "잠시 후 다시 시도해주세요.",
            });
          });
      }
    });
  };

  return (
    <div>
      <TitleContainer>
        <TitleText>구단뱃지</TitleText>
      </TitleContainer>
      <BadgeList
        badgeList={badgeList}
        badgeNameList={badgeNameList}
        badgeCodeList={badgeCodeList}
        setSelectedBadge={setSelectedBadge}
      />
      {badgeList[selectedBadge] === true ? (
        <ConfirmContainer>
          <ConfirmTextContainer>
            <ConfirmText onClick={() => wearBadge(selectedBadge)}>
              확인
            </ConfirmText>
          </ConfirmTextContainer>
        </ConfirmContainer>
      ) : selectedBadge === -1 ? (
        <DisabledConfirmContainer>
          <DisabledTextContainer>
            <DisabledText>선택</DisabledText>
          </DisabledTextContainer>
        </DisabledConfirmContainer>
      ) : (
        <ConfirmContainer>
          <PurchaseTextContainer>
            <PurchaseText onClick={() => handleBuyBadge(selectedBadge)}>
              -1000
            </PurchaseText>
          </PurchaseTextContainer>
        </ConfirmContainer>
      )}
    </div>
  );
}

export default Badge;
