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

export const NoBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0 0 1rem;
  gap: 0.75rem;
`;

export const NoBoardBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  gap: 0.3rem;
`;

export const NoBoardText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
`;

export const NoBoardImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const GoBoardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--gray3, #f2f6fd);
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
`;
