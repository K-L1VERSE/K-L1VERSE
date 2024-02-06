import styled from "styled-components";

/* 채팅 컴포넌트 스타일 */
export const ChattingTop = styled.div`
  height: 2rem;
  border: 2px solid black;
`;

export const ChattingBox = styled.div`
  border: 2px solid blue;
  height: 20rem;
  overflow-y: scroll;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

/* Message 박스 */
export const MessageBox = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  border: 2px solid orange;
`;

export const SenderImg = styled.div`
  width: 3rem;
  height: 3rem;
  border: 2px solid yellow;
  border-radius: 50%;
  margin-right: 0.7rem;
`;

export const OnlyMsg = styled.div`
  background-color: #f1f1f1;
  padding: 0.5rem;
  max-width: 13rem;
  border-radius: 0 1rem 0 1rem;
`;

/* 밑에 채팅바 */
export const ChattingBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  border: 2px solid red;
`;

export const ChattingInput = styled.input`
  width: 80%;
  height: 2rem;
  border: none;
`;

export const ChattingSendBtn = styled.button`
  width: 15%;
  height: 2rem;
  border: 2px solid green;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;
