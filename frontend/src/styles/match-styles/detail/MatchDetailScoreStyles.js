import styled from "styled-components";

export const MatchDetailTop = styled.div`
  font-family: "Pretendard-Bold";
  padding-top: 1.1rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: left;
  font-size: 1rem;
  div {
    margin-top: 0.05rem;
  }
`;

export const ToLeftImg = styled.img`
  width: 1rem;
  height: 1rem;
  margin-top: 0.1rem;
  margin-left: 1rem;
  margin-right: 0.7rem;
  &:hover {
    cursor: pointer;
  }
`;

export const MatchDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;
  margin: 0.3rem;
  margin-bottom: 1.2rem;
`;

export const MatchDetailComponent = styled.div`
  background-color: #f2f6fd;
  width: 358px;
  padding: 20px 0;
  border-radius: 8px;

  flex-direction: column;
  align-items: center;
  align-content: space-evenly;
  display: grid;
  gap: 20px;
`;

export const MatchUpContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  justify-content: space-around;
  padding: 0.5rem;
  background-color: white;
  border-radius: 5px;
`;

export const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: "Pretendard-Bold";
  color: #1a1a1a;
  padding: 1rem;
`;

export const HomeName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #1a1a1a;
`;

export const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ win }) => (win ? "bold" : "normal")};

  color: #002266;
`;

export const TeamComponent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0.1rem 0 0.1rem;
  img {
    margin-right: 0.2rem;
  }
`;

export const VersusComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0.1rem 0 0.1rem;
`;
