import styled from "styled-components";

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px 20px 15px;
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
  width: 5rem;
  align-items: center;
  font-family: "Pretendard-Bold";
  font-size: 0.9rem;
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
  }
  button.selected {
    background-color: #f2f6fd;
    color: #002266;
    font-family: "Pretendard-Bold";
  }
`;

export const TypeImg = styled.img`
  width: 0.8rem;
  margin-right: 0.3rem;
  margin-top: 0.35rem;
`;

export const TypeText = styled.div`
  font-size: 0.8rem;
  padding-top: 0.3rem;
`;

export const TableContainer = styled.div`
  border: 2px solid pink;
  text-align: center;
  table {
    margin: 0 auto;
    border: 2px solid blue;
    width: 95%;
    max-width: 80rem;
    table-layout: fixed;
    td {
      border: 2px solid red;
    }
    tr {
      background-color: pink;
    }
  }
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

export const BadgeImg = styled.img`
  width: 30%;
  height: 30%;
`;

export const MatchInfo = styled.div`
  border: 2px solid blue;
  margin-bottom: 2px;

  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;
