import styled from "styled-components";

export const DoBetTitleComponent = styled.div`
  display: flex;
  justify-content: start;

  align-items: flex-end;
`;

export const DoBetTitle = styled.div`
  font-family: "Pretendard-Bold";
  color: #002266;
  display: flex;
  div {
    margin-left: 0.3rem;
    margin-top: 0.1rem;
    font-size: 0.95rem;
  }
`;

export const DoBetContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const DoBetButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const DoBetInputContainer = styled.div`
  align-items: center;
  width: 100%;
`;

export const DoBetInputComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const TeamSelectButton = styled.button`
  width: 110px;
  height: 56px;
  font-family: "Pretendard-Bold";
  font-size: 0.9rem;
  // 가운데 정렬
  display: flex;
  justify-content: center;
  align-items: center;

  border: ${({ selected }) =>
    selected ? "1px solid #CDD8EC" : "1px solid #F4F4F4"};
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? "#F2F6FD" : "white")};
  img {
    margin-right: 0.2rem;
  }
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

export const TeamNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 40px;
`;

export const TeamNameComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
`;

export const TeamName = styled.div`
  font-weight: bold;
  color: #222222;
  font-size: 0.95rem;
`;

export const InputForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;

  border-radius: 4px;
  border: ${({ disabled }) =>
    disabled ? "1px solid #A9A9A9" : "1px solid #3261c1"};
  width: 100%;
  height: 44px;
  /* gap: 12px; */

  input {
    width: 90%;
    padding: 0 1px;
    height: 44px;
    font-size: 1rem;
    border: none;
  }

  input:focus {
    outline: none;
  }

  label {
    width: 10%;
    height: 44px;
    font-size: 1.2rem;
    color: #222222;
  }
`;

export const DoBetButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 4px;
  /* betComplete가 true이면 비활성화 UI */
  background-color: ${({ disabled }) => (disabled ? "#A9A9A9" : "#3261c1")};
  color: white;
  transition: box-shadow 0.3s ease;
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }`}
`;

export const DoBetInputBox = styled.input`
  width: 100%;
  padding: 0 2px;
  height: 44px;
  font-size: 1.2rem;
  text-align: right;
  margin-right: 1rem;
`;

export const DoBetLabel = styled.label`
  width: 10%;
  height: 44px;
  font-size: 1.2rem;
  color: #222222;

  // 가운데 정렬
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 1rem;
    margin-right: 2rem;
    font-family: "Pretendard-Regular";
  }
`;

export const DoBetText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 0.95rem;
  font-family: "Pretendard-Regular";
`;
