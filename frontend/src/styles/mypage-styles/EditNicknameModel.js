import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(67, 79, 101, 0.8);
`;

export const ModalContainer = styled.div`
  width: 350px;
  height: 220px;
  z-index: 999;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 7px;
  padding: 15px 35px 10px 35px;
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
  height: 20px;
  border: none;
  background-color: transparent;
  font-weight: 600;
  cursor: pointer;
  color: #d7d7d7;
  font-size: 16px;
  :hover {
    color: #000;
  }
`;

export const MyInfoInput = styled.input`
  border: none;
  border-bottom: 0.6px solid #c6c6c6;
  min-width: 200px;
  width: 100%;
  margin: 20px 10px 20px 0;
  outline: none;
  flex: 80%;
  padding-bottom: 5px;
`;

export const ButtonContainer = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: right;
`;

export const CancleButton = styled.button`
  background-color: rgba(233, 236, 242, 0.8);
  border: none;
  box-sizing: border-box;
  padding: 8px 15px;
  border-radius: 7px;
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
