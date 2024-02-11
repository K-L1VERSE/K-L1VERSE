import styled from "styled-components";

/* 채팅 컴포넌트 스타일 */
export const BigChattingContainer = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const ChattingTop = styled.div`
  height: 2rem;
  border: 2px solid black;
`;

export const CleanBot = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  padding-left: 0.5rem;
  padding-bottom: 0.15rem;
  margin: 0 1rem;
  background-color: #fafafa;
  border: 2px solid #efecec;
  border-radius: 0.3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;

  div {
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.1rem;
  }
  div:nth-child(1) {
    font-family: "Pretendard-Bold";
    color: purple;
  }
  div:nth-child(2) {
    color: #607274;
  }
`;

export const ChattingBox = styled.div`
  margin: 0 1rem;
  height: 23.375rem;
  overflow-y: auto;
  padding: 1rem;
  border: 2px solid whitesmoke;
  border-radius: 0.4rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7c8cc;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

/* Message 박스 */
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$isMine ? "row-reverse" : "row")};
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.$isMine ? "flex-end" : "flex-start")};
  height: 1.375rem;
`;

export const MessageInfoBox = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$isMine ? "row-reverse" : "row")};
  align-items: end;
`;

export const SenderImg = styled.img`
  display: inline-block;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
`;

export const OnlyNick = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  font-family: "Pretendard-Regular";
  padding-left: 0.3rem;
  padding-top: 0.1rem;
  margin-right: 0.2rem;
`;

export const BadgeImg = styled.img`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-top: 0.1rem;
`;

export const OnlyMsg = styled.div`
  display: inline-block;
  background-color: ${(props) => (props.$isMine ? "#E5EDFB" : "#f1f1f1")};
  padding: 0.5rem;
  border-radius: ${(props) =>
    props.$isMine ? "1rem 0.1rem 1rem 1rem" : "0.1rem 1rem 1rem 1rem"};
  max-width: 16.5rem;
  margin-top: 0.3rem;
  font-size: 0.85rem;
`;

export const MsgTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left end;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const MsgDay = styled.div`
  display: inline-block;
  font-size: 0.6rem;
  color: gray;
`;

export const MsgHM = styled.div`
  display: inline-block;
  font-size: 0.6rem;
  color: gray;
  margin-top: 0.1rem;
`;

/* 밑에 채팅바 */
export const ChattingBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-left: 0.5rem;
  margin-right: 0.8rem;
  margin-top: 0.3rem;
`;

export const ChattingPlusImg = styled.img`
  width: 2.25rem;
  height: 2.25rem;
`;

export const ChattingInput = styled.div`
  width: 100%;
  height: 2.3rem;
  border-radius: 1rem 1rem 1rem 1rem;
  margin-left: 0.5rem;
  background-color: #f1f1f1;
  border: none;
  font-size: 0.8rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  input {
    border: none;
    outline: none;
    width: 90%;
    height: 80%;
    background-color: #f1f1f1;
    font-family: "Pretendard-Regular";
  }
`;

export const ChattingSendImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 0.4rem;
  &:hover {
    cursor: pointer;
  }
`;

export const ChattingSendBtn = styled.button`
  width: 3.5rem;
  height: 2rem;
  margin-left: 1rem;
  border: none;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;
