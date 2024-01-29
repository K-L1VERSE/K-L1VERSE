import axios from "../../api/axios";
import { useState, useEffect } from "react";
import {
  TitleContainer,
  TitleText,
  BadgeContainer,
  BadgeLineContainer,
  BadgeBackground,
  BadgeText,
  ConfirmContainer,
  ConfirmTextContainer,
  ConfirmText,
} from "../../styles/mypage-styles/badgeStyle";
import { BadgeImageStyle } from "../../styles/mypage-styles/badgeStyle";
import { useNavigate } from "react-router-dom";

function Badge() {

  const badgeCodeList = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
  ];
  const badgeNameList = [
    "울산", "포항", "제주", "전북", "서울", "대전", "대구", "인천", "강원", "광주", "수원", "김천"
  ];
  const [badgeList, setBadgeList] = useState([
    false, false, false, false, false, false, false, false, false, false, false, false,
  ]);
    
  useEffect(() => {
    const temp = [...badgeList];
    
    /* axios로 가지고 있는 뱃지 코드 리스트 가져오기 */
    const request = axios
      .get(`/user/badges`)
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
  }, []);

  const handleBuyBadge = (index) => {
    const confirmPurchase = window.confirm("뱃지를 구매하시겠습니까?");
    
    if (confirmPurchase) {
      /* axios로 뱃지 구매 코드 보내기 */
      const request = axios
        .post(`/user/badges`, {
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
        .post(`/user/badges/wear`, {
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
  
  const BadgeComponent = ({ code }) => {
    const index = badgeCodeList.indexOf(code)

    const handleClick = () => {
      if (badgeList[index]) {
        wearBadge(index);
      } else {
        handleBuyBadge(index);
      }
    }

    return (
      <BadgeBackground onClick={handleClick}>
        { BadgeImageStyle({ code, isBadgeEarned: badgeList[index] }) }
        < BadgeText > { badgeNameList[index] }</BadgeText>
      </BadgeBackground >
    )
  };
    
    const BadgeGroup = ({ codes }) => (
      <BadgeLineContainer>
        {codes.map((code) => (
          <BadgeComponent key={code} code={code} />
        ))}
      </BadgeLineContainer>
    );
    
    const BadgeList = () => {
      const badgesInGroupsOfFour = badgeCodeList.reduce((result, code, index) => {
        const groupIndex = Math.floor(index / 4);
        if (!result[groupIndex]) {
          result[groupIndex] = [];
        }
        result[groupIndex].push(code);
        return result;
      }, []);

      return (
        <BadgeContainer>
          {badgesInGroupsOfFour.map((group, index) => (
            <BadgeGroup key={index} codes={group} />
          ))}
        </BadgeContainer>
      );
    };
  
  const navigate = useNavigate();
  const goMypage = () => {
    navigate("/mypage");
  }

    return (
        <div>
          <TitleContainer>
              <TitleText>구단뱃지</TitleText>
          </TitleContainer>
          <BadgeList />
          <ConfirmContainer>
            <ConfirmTextContainer>
              <ConfirmText onClick={goMypage}>확인</ConfirmText>
            </ConfirmTextContainer>
          </ConfirmContainer>
       </div>
    );
}

export default Badge;