import styled from "styled-components";

export const Shares = styled.div`
  display: flex;
  width: 86%;
  margin: 0 auto;
  justify-content: space-between;
  margin-top: 3rem;
  margin-bottom: 3rem;

  div {
    width: 48%;
    border-radius: 8px;
    height: 3rem;
    display: flex;
    align-items: center;

    font-family: "Pretendard-Bold";
    &:hover {
      cursor: pointer;
    }

    img {
      width: 2rem;
      padding-left: 0.8rem;
      padding-right: 0.5rem;
    }
  }

  div:nth-child(1) {
    color: #3a1d1d;
    background-color: #f7e600;
  }

  div:nth-child(2) {
    background-color: #3261c1;
    svg {
      width: 3rem;
      margin-left: 0.8rem;
    }
    span {
      color: white;
    }
  }
  img {
    width: 2.5rem;
    margin: 0 0.5rem;
    border-radius: 50%;
  }
`;

export const Modal = styled.div`
  position: fixed;
  font-size: 0.9rem;
  top: 20rem;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

export const TopWrap = styled.div`
  position: relative;
  text-align: center;
`;

export const Text = styled.div`
  color: #3261c1;
  font-family: "Pretendard-Bold";
  font-size: 1.3rem;
  white-space: pre-line;
  position: absolute;
  text-align: center;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BottomWrap = styled.div`
  text-align: center;
  padding: 0 2rem;
`;

export const UrlBox = styled.div`
  background-color: #f4f4f4;
  padding: 0.5rem;
  display: flex;
  margin: 2rem 0;

  input {
    border: none;
    flex: 3.5;
    padding: 0.5rem;
    color: gray;
  }

  div {
    background-color: white;
    border: 1px solid gray;
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    flex: 1;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const ShareText = styled.div`
  display: flex;
  text-align: left;
  color: #222222;
  padding: 3rem 0 0.5rem 0;
  font-family: "Pretendard-Regular";
  div:nth-child(1) {
    padding-top: 0.1rem;
    margin-right: 0.2rem;
  }
`;

export const ResultTeam = styled.div``;

export const Team = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .team-name {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  div {
    color: white;
    margin-bottom: 5rem;
    font-family: "Pretendard-Bold";
    font-size: 1.8rem;
  }

  img {
    width: 20rem;
    position: relative;
    z-index: 0;
  }
`;
