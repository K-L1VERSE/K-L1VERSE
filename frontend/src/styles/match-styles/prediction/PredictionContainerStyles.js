import styled from "styled-components";

export const PredictBoxTitleComponent = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
`;

export const PredictBoxTitle = styled.div`
  font-family: "Pretendard-Bold";
  color: #002266;
  display: flex;
  div {
    margin-left: 0.3rem;
    margin-top: 0.05rem;
    font-size: 0.95rem;
  }
`;

export const PredictBoxSubTitle = styled.div`
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #595959;
`;

export const PredictionChartOuterContainer = styled.div`
  justify-content: space-between;
  align-items: center;
`;

export const PredictionChartInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #f4f4f4;
  color: #595959;
  font-family: "Pretendard-Bold";
  padding: 10px;
  img {
    margin-right: 0.2rem;
  }
  font-size: 0.95rem;
`;
