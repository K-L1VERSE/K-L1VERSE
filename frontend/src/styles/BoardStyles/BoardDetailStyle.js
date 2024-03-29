import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  font-family: "Pretendard-Regular";
`;

export const DetailTop = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

export const DetailBox = styled.div`
  // border-bottom: 1px solid #ccc;
  /* padding: 0.1rem 1rem 0rem 1rem; */
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  // margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

export const UserProfile = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.3rem;
`;

export const User = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 0.1rem;
`;

export const UserBadge = styled.img`
  width: 1.4rem;
  height: 1.7rem;
`;

export const CreateAt = styled.p`
  font-size: 0.7rem;
  color: #595959;
  // padding-bottom: 0.5rem;
  // border-bottom: 0.3px solid #ccc;
`;

export const Title = styled.div`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-family: "Pretendard-Bold";
  /* padding-bottom: 10px; */
`;

export const FormattedDate = styled.div`
  font-size: 0.7rem;
  margin: 0.2rem 0;
  color: #595959;
`;

export const Content = styled.p`
  /* margin-top: 1rem; */
  font-size: 0.9rem;
  white-space: pre-wrap;
  line-height: 1.2rem;
`;

export const Price = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: darkblue;
`;

export const DealFlag = styled.p`
  margin: 0;
  font-size: 1em;
  color: #333;
  display: block;

  ${(props) =>
    props.$dealFlag &&
    css`
      background-color: #4caf50; /* Green color for 거래가능 */
      color: #fff;
      padding: 5px;
      border-radius: 5px;
    `}

  ${(props) =>
    !props.$dealFlag &&
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
  display: flex;
  align-items: center;
  background-color: white;
  font-family: "Pretendard-Bold";
  border: none;
  cursor: pointer;
  width: 1.8rem;
  justify-content: center;

  img {
    margin-right: 0.2rem;
  }
`;

export const BackButton = styled.button`
  border: none;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  background-color: white;
  margin-bottom: 1rem;
`;

export const LikeBig = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  font-family: "Pretendard-Regular";
  color: #595959;
`;

export const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  img {
    width: 1rem;
  }

  &:hover {
    color: #007bfsf;
  }
`;

export const LikeBox = styled.div`
  border: 2px solid pink;
  display: flex;
`;

export const LikeCount = styled.span`
  font-size: 0.75rem;
  color: grey;
`;

export const EditDeleteButton = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 1.3rem;
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

export const DetailCommentCount = styled.div`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: #595959;
  align-items: center;
  div {
    padding-top: 0.3rem;
    display: flex;
    align-items: center;
    img {
      margin-right: 0.3rem;
    }
  }
`;

export const DetailImgDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const DetailOnlyImg = styled.img`
  max-width: 100%;
  max-height: 15rem;
  border-radius: 5px;
  margin-left: 0.5rem;
`;

export const Gray = styled.div`
  width: 100%;
  height: 0.05rem;
  background-color: #ccc;
`;
