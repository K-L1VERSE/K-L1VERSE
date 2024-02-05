import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import {
  TitleContainer,
  TitleText,
  ConfirmContainer,
  ConfirmTextContainer,
  ConfirmText,
  PurchaseTextContainer,
  PurchaseText,
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

  const [selectedBadge, setSelectedBadge] = useState(0);

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
    const confirmWear = window.confirm("뱃지를 착용하시겠습니까?");

    if (confirmWear) {
      /* axios로 뱃지 착용 코드 보내기 */
      axios
        .post(`/user/badges/wear`, {
          code: badgeCodeList[index],
        })
        .then(() => {
          alert("뱃지 착용이 완료되었습니다.");
          goMypage();
        })
        .catch(() => {});
    }
  };

  const handleBuyBadge = (index) => {
    const confirmPurchase = window.confirm("뱃지를 구매하시겠습니까?");

    if (confirmPurchase) {
      /* axios로 뱃지 구매 코드 보내기 */
      axios
        .post(`/user/badges`, {
          code: badgeCodeList[index],
        })
        .then((res) => {
          if (res.data.code === 1002) {
            alert("포인트가 부족합니다.");
          } else if (res.data.code === 1200) {
            alert("잘못된 요청입니다.");
          }

          alert("뱃지 구매가 완료되었습니다.");
          setBadgeList(() => {
            const newBadgeList = [...badgeList];
            newBadgeList[index] = true;
            return newBadgeList;
          });

          wearBadge(index);
        })
        .catch(() => {});
    }
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
