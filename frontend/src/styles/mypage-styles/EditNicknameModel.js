import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #00000066;
`;

export const ModalContainer = styled.div`
  width: 21.875rem;
  height: 13.75rem;
  z-index: 999;
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0.9375rem 2.1875rem 0.625rem 2.1875rem;
  box-sizing: border-box;
  .info {
    font-size: 0.7rem;
    color: lightgray;
    margin-top: 0.4rem;
    text-align: center;
  }
`;

export const ModalTopItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Pretendard-Bold";
  font-size: 1rem;
  margin-top: 1.5rem;
  .title {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
`;

export const ModalClose = styled.button`
  height: 1.25rem;
  border: none;
  background-color: transparent;
  font-weight: 600;
  cursor: pointer;
  color: #d7d7d7;
  font-size: 1rem;
  :hover {
    color: #000;
  }
`;

export const MyInfoInput = styled.input`
  border: none;
  border-bottom: 0.06rem solid #c6c6c6;
  min-width: 12.5rem;
  width: 100%;
  margin: 1.25rem 0.625rem 1.25rem 0;
  outline: none;
  flex: 80%;
  padding-bottom: 0.3125rem;
`;

export const ButtonContainer = styled.div`
  padding-top: 1.25rem;
  display: flex;
  gap: 0.625rem;
  justify-content: right;
`;

export const CancleButton = styled.button`
  background-color: rgba(233, 236, 242, 0.8);
  border: none;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;

  ${({ $abled }) =>
    $abled &&
    `
    &:hover {
      background-color: rgba(188, 188, 188, 0.4);
    }
  `}
`;

export const SaveButton = styled(CancleButton)`
  background-color: ${(props) =>
    props.$abled ? "#3261c1" : "rgba(233, 236, 242, 0.8)"};
  color: #fff;
`;
