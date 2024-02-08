import styled from "styled-components";

/* ***********게시판 헤더************ */
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
  height: 2rem;
  margin-bottom: 0.5rem;
`;

export const HeaderH2 = styled.h2`
  font-family: "Pretendard-Bold";
  font-size: 1rem;
`;

export const HeaderButton = styled.button`
  font-family: "Pretendard-Regular";
  border: none;
  background-color: transparent;
  font-size: 0.8rem;
  color: #002266;
  &:hover {
    cursor: pointer;
  }
`;

/* *********** Waggle, Mate ************ */
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  font-family: "Pretendard-Regular";
`;

export const ItemContainer = styled.div`
  margin-bottom: 1rem;
  text-align: left;
  text-decoration: none;
  color: inherit;
  border-top: 1px solid #f4f4f4;
  padding-top: 0.4rem;
`;

export const ItemWriter = styled.div`
  font-size: 0.9rem;
  color: darkslategray;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
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

export const ItemInfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  svg {
    margin-right: 0.3rem;
  }
`;

export const ItemInfoItem = styled.div`
  font-size: 0.7rem;
  margin-right: 0.7rem;
  color: #595959;
  align-items: center;
`;

export const DealFlagContainer = styled.div``;
