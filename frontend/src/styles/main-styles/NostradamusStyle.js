import styled from "styled-components";

export const NostraContainer = styled.div`
  left: 0;
  right: 0;
  padding: 0.7rem 0.5rem;
  height: 8.8rem;

  table {
    margin: 0 auto;
    width: 95%;
    font-size: 0.8rem;
    text-align: center;
    color: #595959;
    tr {
      height: 1.8rem;
    }
  }

  .rank {
    color: #e95400;
    width: 10%;
  }

  .nickname {
    width: 50%;
  }
  .winBet {
    width: 25%;
  }
  .accurate {
    width: 15%;
  }

  .tableTitle {
    font-family: "Pretendard-Bold";
  }
`;

export const NoData = styled.div`
  font-family: "Pretendard-Light";
  font-size: 0.8rem;
  text-align: center;
  margin-top: 2rem;
  color: gray;
`;
