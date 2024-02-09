import styled from "styled-components";

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 2rem 1rem;
`;

export const ArrowImg = styled.img`
  width: 1rem;
  height: 0.9rem;
  &:hover {
    cursor: pointer;
  }
`;

export const LeftTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 5.2rem;
  align-items: center;
  font-family: "Pretendard-Bold";
  font-size: 1rem;
  color: #002266;
`;

export const RightSelect = styled.div`
  display: flex;
  button {
    display: flex;
    padding-top: 0.1rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    font-size: 0.8rem;
    border: none;
    background-color: white;
    height: 1.7rem;
    color: #a9a9a9;
    font-family: "Pretendard-Regular";
    &:hover {
      cursor: pointer;
    }
    svg {
      margin-right: 0.3rem;
    }
  }
  button:first-child svg {
    margin-top: 0.5rem;
  }

  button:last-child svg {
    margin-top: 0.35rem;
  }
  button.selected {
    background-color: #f2f6fd;
    color: #002266;
    font-family: "Pretendard-Bold";

    svg path {
      fill: #002266; /* 원하는 색상으로 변경하세요 */
    }
  }
`;

export const TypeText = styled.div`
  font-size: 0.8rem;
  padding-top: 0.3rem;
`;

export const ScheduleSelect = styled.div`
  padding: 0 20px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  select {
    width: 100px;
    height: 30px;
    text-align: center;
    font-size: 1rem;
    font-family: "Pretendard-Bold";
    border: none;
    outline: none;
  }
`;

/* list */
export const ListStyle = styled.div`
  table {
    margin: 0 auto;
    width: 95%;
    .date {
      font-size: 0.8rem;
      width: 24%;
      padding: 0.3rem;
      border-bottom: 2px solid #f4f4f4;
    }
    .detail {
      border-left: 2px solid #f4f4f4;
      border-bottom: 2px solid #f4f4f4;
      hr {
        border: none;
        width: 100%;
        border-top: 2px solid #f4f4f4;
      }
    }
  }
`;
export const OnlyTime = styled.div`
  .time {
    display: flex;
    height: 4.5rem;
    border-bottom: 2px solid #f4f4f4;

    &:hover {
      cursor: pointer;
    }
  }
  .time:last-child {
    border-bottom: none;
  }
  .timeLeft {
    width: 20%;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
  }
  .timeRight {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    font-family: "Pretendard-Regular";
  }
  .team {
    width: 6rem;
  }
  .team div {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    height: 1.5rem;
  }
  .team div img {
    margin-right: 0.6rem;
  }
  .status {
    display: flex;
  }
  .score {
    color: #002266;
    padding: 0 15px 0 15px;
  }
  .score div {
    height: 1.8rem;
    display: flex;
    align-items: center;
  }
  .statusText {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
  }
  .statusText div {
    background-color: #ff3e24;
    font-size: 0.8rem;
    padding: 0.1rem 0.4rem 0.1rem 0.4rem;
    border-radius: 12px;
    margin-right: 5px;
    color: white;
    font-family: "Pretendard-Regular";
  }
  .statusText.upcoming div {
    background-color: #e5edfb;
    color: #002266;
  }

  .statusText.during div {
    background-color: #008000;
  }

  .statusText div {
    background-color: #ff3e24;
  }
`;

export const BadgeImg = styled.img`
  width: 1.45rem;
`;

/* calendar */
export const TableContainer = styled.div`
  text-align: center;
  table {
    margin: 0 auto;
    width: 95%;
    max-width: 80rem;
    table-layout: fixed;
    tr {
      height: 3rem;
      font-size: 0.8rem;
    }

    .circle {
      width: 2.4rem;
      height: 2rem;
      border-radius: 20px;
      background-color: #f2f6fd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-family: "Pretendard-Bold";
      color: #002266;
      margin: 0 auto;

      &:hover {
        cursor: pointer;
      }
    }
    .circle.selected {
      background-color: #002266;
      color: white;
    }
  }
  .info {
    text-align: right;
    padding-right: 1.5rem;
    padding-bottom: 1rem;
    color: #002266;
    font-size: 0.9rem;
    span {
      font-size: 1.2rem;
      color: #f2f6fd;
    }
  }
  .nothing {
    background-color: #f4f4f4;
    width: 100%;
    height: 0.625rem;
  }
  .dateInfo {
    text-align: left;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    font-family: "Pretendard-Bold";
    color: #002266;
  }
  hr {
    border: none;
    width: 95%;
    border-top: 1px solid #f4f4f4;
  }
`;
