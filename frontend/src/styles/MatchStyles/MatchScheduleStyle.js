import styled from "styled-components";

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
  select {
    width: 100px;
    height: 30px;
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
