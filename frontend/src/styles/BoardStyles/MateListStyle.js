import styled from "styled-components";

/* *********** MateItemCard *********** */
export const MatchTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 1rem;
  margin-top: 0.5rem;
`;

export const MatchTime = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-family: "Pretendard-Regular";
`;

export const MateItemCreated = styled.div`
  font-size: 0.7rem;
  margin-right: 0.7rem;
  margin-bottom: 0.5rem;
  color: #595959;
`;

/* *********** MateDetail *********** */
export const MateDetailTitle = styled.p`
  margin: 0;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-top: 1px solid #ccc;
  margin-top: 1rem;
  padding-top: 1rem;
`;

export const MateDetailContent = styled.p`
  margin: 0;
`;

export const MateDetailTotal = styled.p`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: #333;
`;

/* *********** MateRegistCard *********** */
export const MateInputLabel = styled.label`
  position: relative;
  display: inline-block;
  font-size: 0.9rem;
  color: darkslategrey;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
`;

export const MateNumberContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MateNumberInput = styled.input`
  width: 2rem;
  padding: 0.3rem;
  text-align: center;
  margin-right: 4px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
`;

export const MateInputText = styled.span`
  font-size: 1rem;
`;
