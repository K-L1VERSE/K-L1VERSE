import styled from "styled-components";

export const BoardWrap = styled.div`
  padding-bottom: 0.5rem;
`;

export const BoardItemWrap = styled.div`
  padding: 0.7rem;
  margin: 0.8rem;
  box-shadow: 0 2px 8px 2px #e9ecef;
  border-radius: 8px;
`;

export const Type = styled.div`
  background-color: ${(props) =>
    props.type == 0 ? "#fee8de" : props.type == 1 ? "#E3FAEF" : "#E5EDFB"};
  color: ${(props) =>
    props.type == 0 ? "#f07e3d" : props.type == 1 ? "#16B368" : "#578CEA"};
  font-size: 0.75rem;
  padding: 0.3em;
  border-radius: 0.3rem;
  text-align: center;
  display: inline-block;
  font-family: "Pretendard-Regular";
`;

export const Text = styled.div`
  font-size: 0.85rem;
  font-family: "Pretendard-Regular";
  padding-top: 0.5rem;
  color: #595959;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-top: 0.7rem;
  color: #595959;
`;
export const Title = styled.div`
  font-size: 0.85rem;
`;

export const Date = styled.div`
  text-align: right;
  width: 5rem;
  font-size: 0.7rem;
`;
