import styled from "styled-components";

export const BoardTopNavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 20px;
  width: 390px;
  height: 89px;
  left: 0px;
  top: 68px;
  font-family: "Pretendard-Regular";
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
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 13px;
  width: 358px;
  height: 19px;
`;

export const WaggleButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 6px;
  gap: 4px;
  width: auto;
  height: 26px;
  background-color: #dddddd;
  color: #a5a5a5;
  border-radius: 3px;
  border: none;

  &.active {
    background: #f7e4dc;
    color: #f09168;
    font-weight: bold;
  }
`;

export const MateButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 6px;
  gap: 4px;
  width: auto;
  height: 26px;
  background-color: #dddddd;
  color: #a5a5a5;
  border-radius: 3px;
  border: none;

  &.active {
    background: #e3faef;
    color: #16b368;
    font-weight: bold;
  }
`;
export const ProductButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 6px;
  gap: 4px;
  width: auto;
  height: 26px;
  background-color: #dddddd;
  color: #a5a5a5;
  border-radius: 3px;
  border: none;

  &.active {
    background: #e5edfb;
    color: #578cea;
    font-weight: bold;
  }
`;
