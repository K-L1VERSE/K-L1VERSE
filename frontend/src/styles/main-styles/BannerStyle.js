import styled, { css } from "styled-components";

export const BannerWrap = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
`;

export const BannerItem = styled.div`
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  ${({ $display }) =>
    $display &&
    css`
      opacity: 1;
    `};

  img {
    width: 100%;
  }
`;

export const Toggles = styled.div`
  display: flex;
  justify-content: center;
`;

export const Toggle = styled.div`
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: ${(props) => (props.$display ? "#3261C1" : "#e5e5e5")};
  margin: 0.2rem;
  transition: background-color 0.3s ease;
`;
