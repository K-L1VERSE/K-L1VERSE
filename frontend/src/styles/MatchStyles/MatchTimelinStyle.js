import styled from "styled-components";

// ********************** ScoreItem.jsx **********************

export const ScoreWrap = styled.div`
  background: linear-gradient(to right bottom, #002fa5, #002277);
  border-radius: 5px;
  padding: 1rem 1.2rem;
`;

export const ScoreInner = styled.div`
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.5rem;
  font-family: "Pretendard-Bold";

  img {
    width: 2.3rem;
    padding: 0 0.3rem;
  }
`;

export const Team = styled.div`
  display: flex;
  align-items: center;
`;

export const TeamName = styled.div`
  color: #222222;
`;

export const Score = styled.div`
  color: #002266;
`;

// ********************** ScoreItem.jsx **********************

export const TimelineWrap = styled.div`
  /* background-color: red; */
  margin: 0.5rem 0;
  font-size: 0.9rem;

  table {
    width: 100%;
  }

  tr:nth-child(odd) {
    background-color: #e5edfb;
  }
`;
export const TimeMin = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-family: "Pretendard-Regular";
`;

// ********************** EventItem.jsx **********************

export const Event = styled.div`
  padding: 0.5rem;
  text-align: ${(props) => (props.home ? "right" : "")};
  line-height: 1.3rem;
`;

export const EventName = styled.div`
  font-family: "Pretendard-Bold";
`;

export const MemberInfo = styled.div``;
