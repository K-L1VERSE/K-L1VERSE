import styled from "styled-components";

export const HotClipContainer = styled.div`
  background-color: #f4f4f4;
  padding: 0.6rem 0.6rem;
  margin: 2rem 0;
  height: 13rem;
`;

export const VideoWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  padding: 0.5rem 0.5rem;

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
  width: 16.9rem;
  position: relative;
  height: 10rem;
  iframe {
    margin-top: 0.3rem;
    margin-left: 0.12rem;
  }
  img {
    filter: brightness(70%);
    transition: filter 0.3s ease;
  }
  &:hover {
    img {
      filter: brightness(100%);
    }
  }
`;

export const ThumbnailImg = styled.img`
  width: 16.6rem;
  height: 9.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const PlayImg = styled.img`
  width: 4.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: box-shadow 0.3s ease;
  &:hover {
    cursor: pointer;
  }
`;
