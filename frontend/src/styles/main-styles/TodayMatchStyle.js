import styled from "styled-components";

export const TodayMatchItemhWrap = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  margin: 0 0.8rem;
  padding: 0.5rem;
`;
export const Date = styled.div`
  /* background-color: yellow; */
  font-size: 0.8rem;
  width: 6.5rem;
  display: flex;
  align-items: center;
`;
export const Teams = styled.div``;
export const Team = styled.div`
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.3rem;
`;
export const Name = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0 1rem;
  width: 10rem;
  color: #222222;
  display: flex;
  align-items: center;
  img {
    width: 2rem;
    margin-right: 0.3rem;
  }
`;
export const Score = styled.div`
  width: 1rem;
  display: flex;
  align-items: center;
  color: #002266;
  font-weight: ${(props) => (props.winner ? "bold" : "")};
`;
