import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 0 0 1rem;
  gap: 0.75rem;
`;

export const BoardText = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 0.9rem;
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;
  padding: 1rem 0 0 1rem;
  gap: 0.75rem;
`;

export const NoBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  gap: 0.75rem;
`;

export const NoBoardBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  gap: 0.3rem;
`;

export const NoBoardText = styled.div`
  font-family: "Pretendard-Bold";
`;

export const NoBoardImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

export const GoBoardButton = styled.button`
  border-radius: 0.5rem;
  padding: 0.7rem 0.8rem;
  border: none;
  background: var(--gray3, #f2f6fd);
  font-family: "Pretendard-Bold";
  font-size: 0.875rem;
  cursor: pointer;
`;
