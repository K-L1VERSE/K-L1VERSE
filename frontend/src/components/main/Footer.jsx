import React from "react";
import styled from "styled-components";
import { FooterContainer } from "../../styles/main-styles/MainStyle";

export default function Footer() {
  const leftClick = () => {
    window.open(
      "https://sulim0314.notion.site/K-L1VERSE-c2954f33b8e14e10ac2478998d45fa92?pvs=4",
    );
  };

  const rightClick = () => {
    window.open(
      "https://sulim0314.notion.site/K-L1VERSE-9eafb8ae276b4439ab7768ffd0d4f1b6?pvs=4",
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
