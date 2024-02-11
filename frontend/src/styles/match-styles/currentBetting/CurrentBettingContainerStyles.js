import styled from "styled-components";

export const Container = styled.div`
  width: 380px;
  padding: 5px 10px;
`;

export const CurrentBettingOuterContainer = styled.div`
  justify-content: space-between;
  align-items: center;
`;

export const CurrentBettingInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #f4f4f4;
  color: #595959;
  padding: 10px;
  font-family: "Pretendard-Bold";
  font-size: 0.95rem;
  img {
    margin-right: 0.3rem;
  }
`;

export const CurrentBetTitleComponent = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  font-size: 0.95rem;
`;

export const CurrentBetTitle = styled.div`
  font-family: "Pretendard-Bold";
  color: #002266;
  display: flex;
  div {
    margin-left: 0.3rem;
    margin-top: 0.1rem;
  }
`;
