import styled from "styled-components";

export const HotClipContainer = styled.div`
  background-color: #f4f4f4;
  padding: 0.6rem 0.6rem;
  margin: 2rem 0;
`;

export const VideoWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  padding: 1rem 0.5rem;
  /* background-color: red; */

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
