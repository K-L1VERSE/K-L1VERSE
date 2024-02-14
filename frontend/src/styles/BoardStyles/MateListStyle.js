import styled from "styled-components";

/* *********** MateItemCard *********** */
export const MatchTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 1rem;
  margin-top: 0.5rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  padding: 0 0.7rem;
  // border-radius: 5px;
  border-left: 5px solid #16b368;
  // background-color: #e3faef;
`;

export const MatchTime = styled.div`
  display: inline-flex;
  height: 1rem;
  background-color: #f4f4f4;
  padding: 0.2rem 0.7rem;
  font-size: 0.8rem;
  font-family: "Pretendard-Regular";
  color: black;
  align-items: center;
  div {
    margin-bottom: 0.3rem;
    margin-left: 0.2rem;
  }
`;

export const MateItemCreated = styled.div`
  font-size: 0.7rem;
  color: #595959;

  margin: 1rem 0 0 0;
`;

/* *********** MateDetail *********** */
export const MateDetailTitle = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-family: "Pretendard-Bold";
  margin-bottom: 1rem;
  border-top: 1px solid #ccc;
  margin-top: 1rem;
  padding-top: 1rem;
`;

export const MateDetailContent = styled.p`
  margin: 0;
`;

export const MateDetailTotal = styled.p`
  margin-top: 1rem;
  margin-right: 0.3rem;
  font-size: 0.8rem;
  text-align: right;
  font-family: "Pretendard-Bold";
  color: green;
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
