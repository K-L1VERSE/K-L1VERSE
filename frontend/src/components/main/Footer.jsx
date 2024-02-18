import React from "react";
import styled from "styled-components";
import { FooterContainer } from "../../styles/main-styles/MainStyle";

export default function Footer() {
  const leftClick = () => {
    window.open(
      "https://sohy.notion.site/K-L1VERSE-98b4b5a944b049a8ae5ceab24c1656bc?pvs=4",
    );
  };

  const rightClick = () => {
    window.open(
      "https://sohy.notion.site/K-L1VERSE-c8410fb7673e49c1b7b4b41a0b134aff?pvs=4",
    );
  };

  return (
    <FooterContainer>
      <div>Copyright ⓒ K-L1VERSE</div>
      <div>Team 홍나축</div>
      <div>홍윤기 고수림 고해림 김동훈 엄소현 전성재</div>
      <div>문의 : lion0077v@gmail.com</div>
      <File>
        <div onClick={leftClick}>이용약관 | </div>
        <div onClick={rightClick}>&nbsp;개인정보처리방침</div>
      </File>
    </FooterContainer>
  );
}

export const File = styled.div`
  display: flex;
  cursor: pointer;
`;
