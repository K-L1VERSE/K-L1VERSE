import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Pretendard-Regular";
`;

export const DetailBox = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Content = styled.p`
  margin: 0;
`;

export const Price = styled.p`
  margin: 0;
  font-size: 1em;
  color: #333;
`;

export const DealFlag = styled.p`
  margin: 0;
  font-size: 1em;
  color: #333;

  ${(props) =>
    props.dealFlag &&
    css`
      background-color: #4caf50; /* Green color for 거래가능 */
      color: #fff;
      padding: 5px;
      border-radius: 5px;
    `}

  ${(props) =>
    !props.dealFlag &&
    css`
      background-color: #ff9800; /* Orange color for 거래완료 */
      color: #fff;
      padding: 5px;
      border-radius: 5px;
    `}
`;

export const Total = styled.p`
  margin: 0;
  font-size: 1em;
  color: #333;
`;

export const FullFlag = styled.p`
  margin: 0;
  font-size: 1em;
  color: #333;

  ${(props) =>
    props.fullFlag &&
    css`
      background-color: #4caf50;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
    `}

  ${(props) =>
    !props.fullFlag &&
    css`
      background-color: #ff9800;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
    `}
`;

export const Button = styled.button`
  background-color: #cdd8ec;
  color: #fff;
  padding: 8px 16px;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 10px;
  margin-top: 0.8rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    color: #007bff;
  }
`;

export const LikeCount = styled.span`
  font-size: 0.9em;
`;

export const UpdateButton = styled(Button)`
  background-color: #cdd8ec;
  &:hover {
    background-color: #cdd8ec;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #cdd8ec;
  &:hover {
    background-color: #cdd8ec;
  }
`;
