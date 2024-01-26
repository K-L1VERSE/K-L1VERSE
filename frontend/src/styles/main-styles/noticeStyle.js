import styled, { keyframes, createGlobalStyle } from "styled-components";

export const NoticeBar = styled.div`
  background-color: #002fa5;
  width: 100%;
  color: white;
  font-size: 0.85rem;
  text-align: left;
`;

export const NoticeBar1 = styled.div`
  padding-left: 0.5rem;
  padding-top: 0.5rem;
`;

export const marquee = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); } /* 콘텐츠의 전체 길이만큼 이동 */
`;

export const AnimatedTitle = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  padding-top: 0.2rem;
  padding-bottom: 0.5rem;
  font-size: 0.85rem;
  height: auto;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Track = styled.div`
  white-space: nowrap;
  will-change: transform;
  animation: ${marquee} 200s linear infinite;
`;

export const Content = styled.div`
  display: inline-block; /* 콘텐츠가 옆으로 이어지도록 설정 */
  padding-right: 10px; /* 콘텐츠 사이의 간격을 설정 */
  @media (hover: hover) and (min-width: 700px) {
    transform: translateY(calc(100% - 8rem));
  }
`;

/////////////////////////////////////////////////////////////////////////////// 수직
