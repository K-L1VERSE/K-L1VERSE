import styled from "styled-components";

export const Question = styled.div`
  text-align: center;
`;

export const NumberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
`;

export const Number = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background-color: #3261c1;
  color: white;
  border-radius: 30px;
  height: 2.2rem;
  width: 4.2rem;
  padding-bottom: 0.1rem;
`;

export const PreviousButton = styled.button`
  border: 0.1rem solid #a9a9a9;
  border-radius: 20px;
  background-color: white;
  color: #a9a9a9;
  font-weight: bold;
  height: 2rem;
  width: 2rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #a9a9a9;
    color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export const SingleQuestion = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 10%;
  padding-right: 10%;
  height: 6rem;
  font-size: 1rem;
  font-weight: bold;
`;

export const ChoiceButton = styled.button`
  font-family: "Pretendard-Regular";
  border: 0.0625rem solid #cdd8ec;
  border-radius: 8px;
  width: 80%;
  height: 3.2rem;
  font-size: 0.9rem;
  padding: 10px 10px;
  background-color: #e5edfb;
  outline: none;
  margin-bottom: 0.7rem;
  transition: background-color 0.3s ease;
  &:hover {
    color: white;
    background-color: #b4d4ff;
    cursor: pointer;
  }
`;
