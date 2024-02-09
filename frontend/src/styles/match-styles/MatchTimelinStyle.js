import styled from "styled-components";

export const Line = styled.div`
  border-bottom: 10px solid #f4f4f4;
`;

export const Buttons = styled.div`
  display: flex;
  margin: 1rem;
`;

export const Button = styled.div`
  font-size: 0.8rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  background-color: ${(props) => (props.$focus ? "#E5EDFB" : "#F4F4F4")};
  color: ${(props) => (props.$focus ? "#002266" : "#595959")};
  font-family: ${(props) => (props.$focus ? "Pretendard-Bold" : "")};
  cursor: pointer;
`;

// ********************** ScoreItem.jsx **********************

export const ScoreWrap = styled.div`
  background: linear-gradient(to right bottom, #002fa5, #002277);
  border-radius: 5px;
  padding: 1rem 1.2rem;
  margin: 0 1rem 0 1rem;
`;

export const ScoreInner = styled.div`
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.5rem;
  font-family: "Pretendard-Bold";
  font-size: 0.95rem;
  img {
    width: 2.2rem;
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
  margin: 1rem;
  font-size: 0.85rem;

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
  padding: 0.5rem 0.7rem;
  text-align: ${(props) => (props.$home ? "right" : "")};
  line-height: 1.1rem;
`;

export const EventName = styled.div`
  font-family: "Pretendard-Bold";
`;

export const MemberInfo = styled.div``;

// ********************** BettingPercentItem.jsx **********************
export const PercentBox = styled.div`
  padding: 0 1rem 1rem 1rem;
`;

export const Text = styled.div`
  font-family: "Pretendard-Bold";
`;
export const PercentItems = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

export const PercentItem = styled.div`
  width: ${(props) => (props.$width ? `${props.$width}%` : "35%")};
`;

export const Percent = styled.div`
  background-color: ${(props) =>
    props.$type === "home"
      ? "#3261C1"
      : props.$type === "draw"
        ? "#16B368"
        : "#F07E3D"};
  text-align: center;
  color: white;
  font-family: "Pretendard-Regular";
  padding: 0.4rem 0;
  border-radius: 0.4rem;
`;

export const TeamItem = styled.div`
  font-size: 0.8rem;
  height: 2rem;
  display: flex;
  align-items: center;
  img {
    width: 1.5rem;
  }
`;
