import styled, { css } from "styled-components";

export const DetailTop = styled.div`
  margin-top: 1rem;
  flex-direction: column;
  font-family: "Pretendard-Regular";
  font-size: 1.3rem;
  margin-left: 1rem;
`;

export const RegistCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  font-family: "Pretendard-Regular";
`;

export const TitleInput = styled.input`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 0.3rem;
`;

export const TextArea = styled.textarea`
  /* width: 20rem; */
  height: 10rem;
  padding: 0.6rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  margin-top: 0.3rem;
`;

export const InputLabel = styled.label`
  position: relative;
  display: inline-block;
  font-size: 0.9rem;
  color: darkslategrey;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
`;

export const SelectInput = styled.select`
  width: 21rem;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
`;

export const PriceInput = styled.input`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 0.3rem;
`;

export const NumberInput = styled.input`
  width: 3rem;
  padding: 8px;
  margin-top: 0.5rem;
  margin-right: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
`;

/* *********** 토글 ************ */
export const FlagInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const FlagInputLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

export const FlagInputSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px; // 변경된 반경

  &:before {
    position: absolute;
    content: "";
    height: 16px; // 변경된 높이
    width: 16px; // 변경된 너비
    left: 2px; // 변경된 위치
    bottom: 2px; // 변경된 위치
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const FlagInputCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2196f3;
  }

  &:checked + span:before {
    transform: translateX(18px); // 변경된 이동 거리
  }
`;

export const FlagInputText = styled.span`
  font-size: 1rem;
  margin-left: 10px;
`;

export const FileInputContainer = styled.label`
  display: flex;
  margin-top: 0.1rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: block;
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

export const FilePreview = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 4px;
  /* padding: 0.3rem; */
  margin-left: 0.2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 가득 채우도록 설정 */
    border-radius: 3px; /* 이미지에도 border-radius를 적용하면 더 자연스러워집니다. */
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

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-left: 1rem;
  gap: 0.5rem;
`;

export const OuterCircle = styled.div`
  width: 2rem;
  height: 1rem;
  border-radius: 25px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$dealFlag ? "flex-end" : "flex-start")};
  padding: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  ${(props) =>
    props.$dealFlag &&
    css`
      background-color: #578cea;
    `}
`;

export const InnerCircle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.3s ease;
`;

export const DealFlagText = styled.div`
  font-size: 1rem;
  margin-left: 10px;
`;
