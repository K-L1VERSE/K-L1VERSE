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
