import styled from "styled-components";

export const Share = styled.div`
  font-size: 1.2em;
  margin-left: 10px;
  cursor: pointer;
`;

export const ShareBox = styled.div`
  display: flex;
  margin: 10px;
  button {
    display: flex;
    width: 100%;
    background: none;
    outline: none;
    border: none;
  }
  textarea {
    opacity: 0;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;
