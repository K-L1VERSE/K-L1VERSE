import styled from "styled-components";

export const TeamContainer = styled.div`
  //컨텐츠 양옆으로 정렬
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 10px 15px 10px 10px;
`;

export const TeamNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  width: 90px;
  height: 40px;
`;

export const TeamNameComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TeamBettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;

  gap: 10px;

  //세로로 중앙 정렬
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TeamName = styled.div`
  font-weight: bold;
  color: #222222;
`;

export const PredictionAmount = styled.div`
  font-size: 0.8rem;
  color: #595959;
  font-family: "Pretendard-Light";
`;

export const PredictionRatio = styled.div`
  font-weight: bold;
  color: #3261c1;
`;
