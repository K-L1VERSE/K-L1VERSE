import styled from "styled-components";

export const Category = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`;

export const Title = styled.div`
  color: #002266;
  /* font-weight: bold; */
  font-size: 1rem;
  font-family: "Pretendard-Bold";
`;

export const AllBtn = styled.div`
  color: #002266;
  font-size: 0.7rem;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`;

/* Footer */
export const FooterContainer = styled.div`
  margin-top: 3rem;
  height: 13rem;
  background-color: #f5f7f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
    color: gray;
  }
`;
