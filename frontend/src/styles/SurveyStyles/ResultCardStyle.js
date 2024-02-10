import styled from "styled-components";

export const Shares = styled.div`
  margin-bottom: 1.5rem;
  img {
    width: 2.5rem;
    margin: 0 0.5rem;
    border-radius: 50%;
  }

  span img {
    width: 1.5rem;
    padding: 0.5rem;
    background-color: #f8f8f8;
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
  }
`;

export const ShareText = styled.div`
  text-align: left;
  color: #222222;
  padding: 5rem 0 0.5rem 0;
  border-bottom: 1px solid whitesmoke;
`;

export const ResultTeam = styled.div`
  .backgroundImage {
    width: 100%;
    height: 20rem;
  }
`;

export const Team = styled.div`
  position: absolute;
  top: 25rem;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    color: white;
    margin-bottom: 2.5rem;
    font-family: "Pretendard-Bold";
    font-size: 1.8rem;
  }

  .teamImage1 {
    width: 10rem;
    height: auto;
  }

  .teamImage2 {
    width: 13rem;
    height: auto;
  }

  .teamImage3 {
    width: 10rem;
    height: auto;
  }

  .teamImage4 {
    width: auto;
    height: 12rem;
  }

  .teamImage5 {
    width: auto;
    height: 12rem;
  }

  .teamImage6 {
    width: 18rem;
    height: auto;
  }

  .teamImage7 {
    width: 12rem;
    height: auto;
  }

  .teamImage8 {
    width: auto;
    height: 10rem;
  }

  .teamImage9 {
    width: 18rem;
    height: auto;
  }

  .teamImage10 {
    width: 12rem;
    height: auto;
  }

  .teamImage11 {
    width: 12rem;
    height: auto;
  }

  .teamImage12 {
    width: auto;
    height: 12rem;
  }
`;
