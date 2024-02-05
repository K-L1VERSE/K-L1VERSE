import styled from "styled-components";

// ******************** TeamInfoPage ********************

export const TeamPageWrap = styled.div`
  margin-top: 1.5rem;
`;

export const TeamWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 23rem;
  margin: 0 auto;
  padding-bottom: 1.3rem;
`;

export const TeamItem = styled.div`
  text-align: center;
  color: #222222;
  margin: 1rem 1.2rem;
  background-color: ${(props) => (props.focus ? "#E5EDFB" : "")};
  padding: 0.3rem;
  border-radius: 0.5rem;
  cursor: pointer;

  img {
    width: 2.7rem;
  }
`;

export const TeamName = styled.div`
  font-size: 0.8rem;
`;

// ******************** TeamInfoItem ********************

export const TeamImg = styled.div`
  img {
    border: 1px solid #f4f4f4;
    padding: 0.5rem;
  }
`;

export const Top = styled.div`
  padding: 1rem;
  display: inline-flex;
  img {
    width: 5rem;
  }
`;
export const RightItem = styled.div`
  padding: 0.5rem 1rem;
`;

export const TeamNameItem = styled.div`
  color: #002fa5;
  font-family: "Pretendard-Bold";
  font-size: 1.1rem;
`;

export const SocialItem = styled.div`
  img {
    width: 1.3rem;
    margin-right: 0.5rem;
    margin: 0.5rem 0.5rem 0.5rem 0;
    cursor: pointer;
  }
  div {
    background-color: #e5edfb;
    color: #002266;
    padding: 0.2rem 0;
    border-radius: 5rem;
    font-size: 0.8rem;
    width: 4rem;
    text-align: center;
    cursor: pointer;
  }
`;
export const TeamDesc = styled.div`
  margin: 0 1rem;
  padding: 0.7rem 0.2rem;
  border-top: 1px solid #002266;
  color: #222222;
  font-size: 0.9rem;
  line-height: 1.3rem;
`;

export const TeamInfoWrap = styled.div`
  border-top: 13px solid #f4f4f4;
`;

export const MembersWrap = styled.div`
  padding: 1rem 0;
  margin: 0 1rem;
  border-top: 1px solid #002266;
`;

export const Members = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* width: 23rem;
  margin: 0 auto; */
`;

export const Position = styled.div`
  font-size: 0.9rem;
  color: #002266;
  font-family: "Pretendard-Bold";
  margin-bottom: 0.3rem;
`;

export const Member = styled.div`
  color: #222222;
  font-size: 0.8rem;
  margin: 0.5rem 1.4rem 0.5rem 0.3rem;
  text-align: center;
  img {
    width: 2.7rem;
    border-radius: 50%;
  }
`;

export const Backno = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 0.75rem;
  padding: 0.1rem 0;
`;

export const MemberName = styled.div`
  font-size: 0.75rem;
`;
