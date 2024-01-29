import axios from "../../api/axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as BadgeImageStyle } from "../../assets/BadgeBackground2.svg";

const TitleContainer = styled.div`
    display: flex;
    width: 390px;
    height: 61px;
`;

const TitleText = styled.div`
    padding: 12px 16px 0px 16px;
    color: var(--blue1, #026);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const BadgeContainer = styled.div`
    display: flex;
    width: 390px;
    padding: 0px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const BadgeLineContainer = styled.div`
    display: flex;
    width: 340px;
    justify-content: space-between;
    align-items: flex-start;
`;

const BadgeBackground = styled.div`
    display: flex;
    width: 50px;
    padding: 4px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const BadgeImageBackground = styled.div`
    display: flex;
    padding: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const BadgeImage = styled.div`
    width: ${28}px;
    height: ${28}px;
    position: absolute;
    background-img: url(${'badge/badge1.png'});
`;

const BadgeText = styled.div`
    color: var(--gray1, #222);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

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

    const BadgeImageStyle = ({code}) => {
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="55" viewBox="0 0 44 55" fill="none">
            <g filter="url(#filter0_d_314_260)">
                <path d="M36.08 38.8533C37.2457 38.0449 38 36.6975 38 35.193L37.9771 10.4912C37.9771 8.02105 35.9429 6 33.4286 6L10.5714 6C8.05714 6 6.02286 8.02105 6.02286 10.4912L6 35.193C6 36.6975 6.75428 38.0449 7.92 38.8533L22 48.6667L36.08 38.8533Z" fill="white"/>
                <path d="M35.966 38.689L35.9656 38.6893L22 48.4229L8.03436 38.6893L8.03397 38.689C6.92012 37.9165 6.20006 36.6296 6.2 35.1932C6.2 35.1931 6.2 35.193 6.2 35.193L6.22286 10.4914L6.22286 10.4912C6.22286 8.13354 8.16556 6.2 10.5714 6.2L33.4286 6.2C35.8344 6.2 37.7771 8.13354 37.7771 10.4912L37.7771 10.4914L37.8 35.193C37.8 36.6295 37.0799 37.9165 35.966 38.689Z" stroke="#002266" stroke-width="0.4"/>
            </g>
    
            <image href={`/badge/badge${code}.png`} width="28" height="28" x="8" y="10"/>
    
            <defs>
                <filter id="filter0_d_314_260" x="0" y="0" width="44" height="54.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="3"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_314_260"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_314_260" result="shape"/>
                </filter>
            </defs>
        </svg>
    }

    return (
        <div>
            <TitleContainer>
                <TitleText>구단뱃지</TitleText>
            </TitleContainer>
            <BadgeContainer>
                <BadgeLineContainer>
                    <BadgeBackground>
                        {BadgeImageStyle({code: 1})}
                        <BadgeText>수원</BadgeText>
                    </BadgeBackground>
                </BadgeLineContainer>
            </BadgeContainer>
          <div>
            <p>
              {badgeList &&
                badgeList.map((isBadgeEarned, index) => (
                  <img
                    key={index}
                    src={`/badge/badge${index + 1}.png`}
                    alt={`badge${index + 1}`}
                    width={60}
                    height={60}
                    style={{
                      filter: isBadgeEarned ? "none" : "grayscale(100%)",
                    }}
                    onClick={() =>
                      !isBadgeEarned ? handleBuyBadge(index) : wearBadge(index)
                    }
                  />
                ))}
            </p>
          </div>
        </div>
    );
}

export default Badge;