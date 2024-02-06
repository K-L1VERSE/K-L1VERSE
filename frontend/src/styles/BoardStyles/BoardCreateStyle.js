import styled from "styled-components";

export const DetailTop = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-top: 1rem;
  flex-direction: column;
  font-family: "Pretendard-Regular";
  font-size: 1.3rem;
`;

export const RegistCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  font-family: "Pretendard-Regular";
`;

export const Form = styled.form`
  flex-direction: column;
  margin: 1rem;
`;

export const TitleInput = styled.input`
  width: 22rem;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 22rem;
  height: 10rem;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
`;

export const PriceInput = styled.input`
  padding: 0.2rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
  width: 5rem;
`;

export const NumberInput = styled.input``;

export const FlagInput = styled.input``;

export const FileInputContainer = styled.label`
  display: flex;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.span`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid lightgrey;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;
