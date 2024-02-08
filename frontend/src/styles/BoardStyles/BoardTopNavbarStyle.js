import styled from "styled-components";

export const BoardTopNavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 20px;
  width: 390px;
  top: 68px;
  font-family: "Pretendard-Regular";
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #002266;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 0px;
  gap: 13px;
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
  font-size: 0.85rem;

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
  font-size: 0.85rem;

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
  font-size: 0.85rem;

  &.active {
    background: #e5edfb;
    color: #578cea;
    font-weight: bold;
  }
  &:hover {
    cursor: pointer;
  }
`;
