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
    Swal.fire({
      title: "뱃지를 착용하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        "<div style='font-size:20px; font-family:revert; font-weight:550;'>착용</div>",
      cancelButtonText:
        "<div style='font-size:20px; font-family:revert; font-weight:550;'>취소</div>",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/user/badges/wear`, {
            code: badgeCodeList[index],
          })
          .then(() => {
            Swal.fire({
              icon: "error",
              title: "뱃지 착용이 완료되었습니다.",
              confirmButtonText:
                "<div style='font-size:20px; font-family:revert; font-weight:550;'>확인</div>",
            });

            setUserState((prev) => ({
              ...prev,
              mainBadge: badgeCodeList[index],
            }));
            goMypage();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "잠시 후 다시 시도해주세요.",
              confirmButtonText:
                "<div style='font-size:20px; font-family:revert; font-weight:550;'>뒤로 가기</div>",
            });
          });
      }
    });
  };

  const handleBuyBadge = (index) => {
    Swal.fire({
      title: "뱃지를 구매하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        "<div style='font-size:20px; font-family:revert; font-weight:550;'>착용</div>",
      cancelButtonText:
        "<div style='font-size:20px; font-family:revert; font-weight:550;'>취소</div>",
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
                confirmButtonText:
                  "<div style='font-size:20px; font-family:revert; font-weight:550;'>뒤로가기</div>",
              });
            } else if (res.data.code === 1200) {
              Swal.fire({
                icon: "error",
                title: "잘못된 요청입니다.",
                confirmButtonText:
                  "<div style='font-size:20px; font-family:revert; font-weight:550;'>뒤로가기</div>",
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "뱃지 구매가 완료되었습니다.",
                confirmButtonText:
                  "<div style='font-size:20px; font-family:revert; font-weight:550;'>확인</div>",
              });
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
              confirmButtonText:
                "<div style='font-size:20px; font-family:revert; font-weight:550;'>뒤로가기</div>",
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
