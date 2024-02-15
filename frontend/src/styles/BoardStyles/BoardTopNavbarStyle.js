import styled from "styled-components";

export const BoardTopNavbarContainer = styled.div`
  padding: 1rem 1rem;
  font-family: "Pretendard-Regular";
`;

export const Title = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 1rem;
  color: #002266;
  margin-bottom: 1.5rem;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
`;

export const WaggleButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  color: #a9a9a9;
  border-radius: 0.3rem;
  border: none;
  font-size: 0.8rem;
  padding: 0.35rem 0.5em;

  &.active {
    background: #fee8de;
    color: #f07e3d;
    font-weight: bold;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const MateButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  color: #a9a9a9;
  border-radius: 0.3rem;
  border: none;
  font-size: 0.8rem;
  padding: 0.35rem 0.5em;

  &.active {
    background: #e3faef;
    color: #16b368;
    font-weight: bold;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const ProductButton = styled.button`
  display: flex;
  background-color: #f4f4f4;
  color: #a9a9a9;
  border-radius: 0.3rem;
  border: none;
  font-size: 0.8rem;
  padding: 0.35rem 0.5em;

  &.active {
    background: #e5edfb;
    color: #578cea;
    font-weight: bold;
  }
  &:hover {
    cursor: pointer;
  }
`;
