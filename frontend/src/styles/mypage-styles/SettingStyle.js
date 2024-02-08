import styled, { css } from "styled-components";

export const SettingText = styled.div`
  margin: 1rem;
  font-family: "Pretendard-Regular";
`;

export const Line = styled.hr`
  color: rgba(0, 0, 0, 0.65);
`;

export const SettingItemWrap = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;

  img {
    width: 1.5rem;
  }
`;

export const Text = styled.div`
  font-size: 0.8rem;
  padding-left: 1rem;
  color: ${(props) => (props.color === "logout" ? "rgb(239,79,79)" : "black")};
  cursor: ${(props) => (props.color === "logout" ? "pointer" : "")};
`;

export const AlignItem = styled.div`
  display: flex;
  align-items: center;
`;

export const OuterCircle = styled.div`
  width: 2rem;
  height: 1rem;
  border-radius: 25px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$notificationFlag ? "flex-end" : "flex-start"};
  padding: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  ${(props) =>
    props.$notificationFlag &&
    css`
      background-color: #002fa5;
    `}
`;

export const InnerCircle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.3s ease;
`;
