import styled from "styled-components";

export const HotClipContainer = styled.div`
  left: 0;
  right: 0;
  height: 12.5rem;
  background-color: #f4f4f4;
  color: #002266;
  font-size: 1.1rem;
  padding: 0.6rem 0.6rem;
`;

export const Img = styled.img`
  width: 1.1rem;
  margin-right: 0.3rem;
`;

export const VideoWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  height: 10.4rem;

  &::-webkit-scrollbar {
    height: 7.5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const VideoContainer = styled.div`
  flex: 0 0 auto;
  width: 17rem;
`;
