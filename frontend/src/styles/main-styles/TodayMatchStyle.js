import styled from "styled-components";

export const NoMatchText = styled.div`
  font-size: 0.8rem;
  color: gray;
  text-align: center;
  padding: 0.5rem 0;
`;

export const TodayMatchItemhWrap = styled.div`
  display: flex;
  /* display: inline-block; */
  margin: 0 0.8rem;
  padding: 0.5rem;
  /* background-color: red; */
`;

export const Date = styled.div`
  /* background-color: yellow; */
  font-size: 0.75rem;
  width: 30vw;
  display: flex;
  align-items: center;
`;
export const Teams = styled.div`
  width: 70vw;
  /* background-color: blue; */
`;

export const Team = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  font-size: 0.85rem;
`;
export const Name = styled.div`
  font-weight: bold;
  padding: 0 1rem;
  width: 10rem;
  color: #222222;
  display: flex;
  align-items: center;
  img {
    width: 1.7rem;
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
