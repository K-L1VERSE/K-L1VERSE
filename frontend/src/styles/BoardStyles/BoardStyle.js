import styled from "styled-components";

/* ***********게시판 헤더************ */
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
`;

export const HeaderH2 = styled.h2`
  width: auto;
  height: 20px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: #222222;
`;

export const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: #002266;
`;

/* *********** Waggle, Mate ************ */
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  justify-content: flex-start;
  font-family: "Pretendard-Regular";
`;

export const ItemContainer = styled.div`
  margin-bottom: 1rem;
  text-align: left;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #f4f4f4;
`;

export const ItemWriter = styled.div`
  font-size: 0.9rem;
  color: black;
  margin-bottom: 8px;
`;

export const ItemTitle = styled.div`
  font-size: 1rem;
  color: #222222;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const ItemContent = styled.div`
  font-size: 0.8rem;
  a {
    color: #a9a9a9;
    text-decoration: none;
  }
`;
