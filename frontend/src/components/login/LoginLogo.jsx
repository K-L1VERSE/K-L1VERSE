import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styled, { css } from "styled-components";
import Community from "../../assets/login_button/community.png";
import Betting from "../../assets/login_button/betting.png";

function LoginLogo() {
  const [index, setIndex] = useState(0);

  const backgrounds = [
    {
      id: 0,
      topText: "K-League에 대한",
      bottomText: "모든 것을 공유해요",
      img: Community,
    },
    {
      id: 1,
      topText: "베팅을 통해",
      bottomText: "승리를 예측해봐요",
      img: Betting,
    },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIndex((index + 1) % backgrounds.length);
    },
    onSwipedRight: () =>
      setIndex((index - 1 + backgrounds.length) % backgrounds.length),
    trackMouse: true,
  });

  return (
    <LogoWrap>
      <TopItem {...handlers}>
        {backgrounds.map((background) => (
          <Top key={background.id} display={background.id === index}>
            <TopText>{background.topText}</TopText>
            <BottomText>{background.bottomText}</BottomText>
            <Img>
              <img src={background.img} draggable="false" alt="background" />
            </Img>
          </Top>
        ))}
      </TopItem>
      <Toggles>
        {backgrounds.map((background) => (
          <Toggle display={background.id === index} />
        ))}
      </Toggles>
    </LogoWrap>
  );
}

export default LoginLogo;

const LogoWrap = styled.div`
  text-align: center;
  padding: 3rem 0 1.5rem 0;
  height: 27rem;
`;

const TopItem = styled.div`
  position: relative;
  height: 25rem;
  /* height: 25rem;
  overflow: none; */
`;

const Top = styled.div`
  /* background-color: red; */
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  ${({ display }) =>
    display &&
    css`
      opacity: 1;
    `};
`;

const Img = styled.div`
  /* background-color: blue; */
  height: 23rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 18em;
  }
`;

const TopText = styled.div`
  font-size: 0.9rem;
`;

const BottomText = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 1.3rem;
  margin-top: 0.3rem;
`;

const Toggles = styled.div`
  display: flex;
  justify-content: center;
`;

const Toggle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${(props) => (props.display ? "#3261C1" : "#e5e5e5")};
  margin: 0.2rem;
  transition: background-color 0.3s ease;
`;
