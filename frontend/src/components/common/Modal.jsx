import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
  }

  // 닫힘 버튼
  button {
    position: absolute;
    top: 7px;
    right: 7px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: gray;

    &:hover {
      color: #f53333;
    }
  }
`;

// Modal component
const Modal = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>x</button>
        {children}
      </ModalContainer>
    </Overlay>,
    document.body,
  );
};

export default Modal;
