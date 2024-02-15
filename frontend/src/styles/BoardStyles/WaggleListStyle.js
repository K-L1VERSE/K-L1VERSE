import styled from "styled-components";

export const WaggleListImage = styled.img`
  max-width: 4rem;
  max-height: 4rem;
  display: block;
  border-radius: 8px;
  margin: 0.3rem 0.5rem 0 0;
`;

export const WaggleImageContainer = styled.div`
  /* margin-top: 20px; */
  max-width: 100%;
  max-height: 400px;
  overflow: hidden;
`;

export const WaggleImage = styled.img`
  width: 10rem;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  /* margin-bottom: 20px; */
  margin-left: 0.5rem;
`;

export const WaggleImageWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  padding: 0.5rem 0.5rem;
  margin: 1rem 0;

  &::-webkit-scrollbar {
    height: 7.5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7c8cc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const WaggleImageTest = styled.img`
  flex: 0 0 auto;

  width: auto;
  height: 9rem;
  position: relative;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin: 0 0.2rem;

  &:hover {
    img {
      filter: brightness(100%);
    }
  }
`;
