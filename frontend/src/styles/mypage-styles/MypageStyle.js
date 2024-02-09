import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 0 0 1rem;
  gap: 0.75rem;
`;

export const BoardText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 0.875rem;
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;
  padding: 1rem 0 0 1rem;
  gap: 0.75rem;
`;
