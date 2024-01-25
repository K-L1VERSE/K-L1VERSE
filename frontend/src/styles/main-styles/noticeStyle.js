import styled, { keyframes } from "styled-components";

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
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
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
  animation: ${marquee} 15s linear infinite;
`;

export const Content = styled.div`
  @media (hover: hover) and (min-width: 700px) {
    transform: translateY(calc(100% - 8rem));
  }
`;
