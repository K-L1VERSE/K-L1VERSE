import styled from "styled-components";

/* ***********게시판 헤더************ */
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f4f4f4;
`;

export const HeaderDiv = styled.div`
  display: flex;
  font-size: 1.1rem;
  line-height: 10px;
  color: #222222;
  font-family: "Pretendard-Bold";
  div {
    margin-top: 0.5rem;
    margin-left: 0.3rem;
  }
`;

export const HeaderButton = styled.button`
  font-family: "Pretendard-Regular";
  border: none;
  background-color: transparent;
  font-size: 0.7rem;
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
  justify-content: flex-start;
  font-family: "Pretendard-Regular";
  margin-bottom: 2rem;
`;

export const ForPadding = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #f4f4f4;
`;

export const ItemContainer = styled.div`
  text-align: left;
  text-decoration: none;
  color: inherit;
  padding-top: 0.4rem;
`;

export const WriterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
`;

export const WriterProfile = styled.img`
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  margin-right: 0.3rem;
`;

export const ItemWriter = styled.div`
  font-size: 0.9rem;
  color: darkslategray;
  margin-right: 0.1rem;
`;

export const WriteBadge = styled.img`
  width: 1rem;
  height: 1rem;
`;
export const ImageContentBox = styled.div`
  display: flex;
  margin-top: 0.5rem;
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
    color: inherit;
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
  margin-bottom: 0.5rem;
  color: #595959;
  align-items: center;
`;

export const DealFlagContainer = styled.div`
  display: absolute;
  margin-bottom: 0.3rem;
`;
