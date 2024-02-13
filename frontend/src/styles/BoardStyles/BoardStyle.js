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
  border-bottom: 2px solid #f4f4f4;
`;
export const FirstLine = styled.div``;

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
  width: 1.4rem;
  height: 1.7rem;
`;
export const ImageContentBox = styled.div`
  display: flex;
`;
export const ItemTitle = styled.div`
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1rem;
  color: #222222;
  text-decoration: none;
  margin-top: 0.4rem;
  font-family: "Pretendard-Bold";
  a {
    text-decoration: none;
  }
`;

export const ItemContent = styled.div`
  font-size: 0.8rem;
  div {
    margin-bottom: 0.5rem;
  }
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

/* *********** toggle button ************ */
export const ToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1.2rem;
  margin-bottom: -0.5rem;
  background-color: #ffffff;
`;

export const ToggleComponent = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: end;

  button {
    padding: 0.625rem 0.3rem 0rem 0.3rem;
    border: none;
    cursor: pointer;
    background-color: #ffffff;
  }
`;

export const ToggleText = styled.div`
  font-size: 0.8rem;
  font-family: "Pretendard-Bold";

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
