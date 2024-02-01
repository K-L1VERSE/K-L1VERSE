import styled from "styled-components";

export const TableContainer = styled.div`
  border: 2px solid pink;
  text-align: center;
  table {
    border: 2px solid blue;
    width: 95%;
    table-layout: fixed;
    td {
      border: 2px solid red;
    }
    tr {
      background-color: pink;
    }
  }
`;
