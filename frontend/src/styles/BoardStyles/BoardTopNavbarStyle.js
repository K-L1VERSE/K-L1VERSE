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
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  font-size: 13px;
  height: 28px;
  width: auto;
  gap: 4px;
  background-color: #f4f4f4;
  color: #a9a9a9;
  border-radius: 4px;
  border: none;

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
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  font-size: 13px;
  height: 28px;
  gap: 4px;
  width: auto;
  background-color: #f4f4f4;
  color: #a9a9a9;
  border-radius: 4px;
  border: none;

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
  flex-direction: row;
  align-items: center;
  height: 26px;
  padding: 8px 10px;
  font-size: 13px;
  height: 28px;
  gap: 4px;
  width: auto;
  background-color: #f4f4f4;
  color: #a9a9a9;
  border-radius: 4px;
  border: none;

  &.active {
    background: #e5edfb;
    color: #578cea;
    font-weight: bold;
  }
  &:hover {
    cursor: pointer;
  }
`;
