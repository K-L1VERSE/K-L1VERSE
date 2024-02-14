import styled from "styled-components";

/* ************* CommentList ************* */
export const ListContainer = styled.div`
  padding: 0.1rem 1rem 1rem 1rem;
  margin-top: 1rem;
`;

export const ReplyImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CommentListContainer = styled.div``;

export const CommentItem = styled.li`
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  list-style: none;
`;

export const CommentContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  justify-content: space-between;
`;

export const CommentContent = styled.p`
  /* display: flex; */
  margin-bottom: 0.1rem;
  // margin-left: 1rem;
  font-size: 0.8rem;
  color: #5f5f5f;
  display: block;
  white-space: pre-wrap;
`;

export const CommentTime = styled.div`
  display: flex;
  font-size: 0.6rem;
  color: grey;
  align-items: center;
  justify-content: flex-end;
  div {
    display: flex;
  }

  img {
    display: none;
  }
`;

export const WriterContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const WriterProfile = styled.img`
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  margin-right: 0.3rem;
`;

export const CommentWriter = styled.div`
  font-size: 0.9rem;
  color: black;
  margin-right: 0.1rem;
`;

export const WriterBadge = styled.img`
  width: 1.4rem;
  height: 1.7rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 0.7rem;
  margin-bottom: 0.2rem;
  height: 1.3rem;
`;

export const CommentRegistContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0 0.6rem 0.5rem;
  font-size: 0.9rem;
`;

export const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  img {
    margin: 0.5rem;
  }
  img:nth-of-type(2) {
    margin-top: 0.7rem;
  }
  div {
    margin-top: 0.7rem;
    font-size: 0.9rem;
  }
`;

export const TextBottom = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2rem;
`;

export const EditButton = styled.button`
  /* background-color: #fff; */
  /* background-color: yellowgreen; */
  color: grey;
  font-size: 0.5em;
  border: none;
  cursor: pointer;
  border-radius: 10px;

  &.hover {
    text-decoration: underline;
  }
`;

export const DeleteButton = styled.button`
  background-color: #fff;
  color: grey;
  font-size: 0.5em;
  padding-left: 0.3rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

export const LikeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  size: 0.7rem;
`;

/* ************* CommentForm ************* */
export const CommentFormContainer = styled.form`
  font-family: "Pretendard-Regular";
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 1rem;
`;

export const TextContainer = styled.form`
  display: flex;
  margin-top: 0.1rem;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  resize: none;
  flex: 1;
  font-family: "Pretendard-Regular";
  border-radius: 0;
  width: 100%;
  border: none;
  height: auto;
  border-bottom: 1px solid #ccc;
  outline: none;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  div {
    display: flex;
    div {
      padding-top: 0.3rem;
      margin-left: 0.1rem;
    }
  }
`;

export const CheckboxInput = styled.input`
  width: 1rem;
  margin-left: 0.5rem;
`;

// 댓글 수정창
export const CommentInput = styled.input`
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  padding: 8px;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  width: 100%;
  border: 1px solid white;
  border-radius: 4px;
  outline: none;
  background-color: #e6f4fa;
`;

export const SubmitButton = styled.button`
  background-color: #cdd8ec;
  color: #fff;
  font-size: 0.8em;
  border: none;
  border-left: 1px solid #ccc;
  cursor: pointer;
  height: 100%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #bbe2ec;
  }
`;

export const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border: none;
  cursor: pointer;
`;

export const SubmitImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

export const CancelButton = styled.button`
  color: grey;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.5rem;

  &.hover {
    text-decoration: underline;
  }
`;

export const ReplyButton = styled.button`
  font-size: 0.5em;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
