import styled from "styled-components";

/* ************* CommentList ************* */
export const ListContainer = styled.div`
  margin-top: 1rem;
  margin-right: 0.4rem;
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
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #5f5f5f;
  display: block;
`;

export const CommentTime = styled.div`
  margin-left: 1rem;
  font-size: 0.5rem;
  color: grey;
  align-items: center;
  justify-content: flex-end;
`;

export const CommentWriter = styled.div`
  font-size: 0.9rem;
  color: black;
  margin-left: 0.8rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 0.7rem;
  margin-bottom: 0.2rem;
`;

export const EditButton = styled.button`
  background-color: #fff;
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
  margin-right: 0.7rem;
  justify-content: end;
  size: 0.7rem;
`;

/* ************* CommentForm ************* */
export const CommentFormContainer = styled.form`
  font-family: "Pretendard-Regular";
`;

export const TextContainer = styled.form`
  display: flex;
  margin-top: 0.1rem;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  resize: none;
  flex: 1;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
`;

export const CheckboxInput = styled.input``;

// 댓글 수정창
export const CommentInput = styled.input`
  margin-left: 0.8rem;
  padding: 8px;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: bisque;
`;

export const SubmitButton = styled.button`
  background-color: #cdd8ec;
  color: #fff;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  /* border-radius: 20px; */

  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled.button`
  background-color: #cdd8ec;
  color: #000;
  padding: 8px 12px;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
`;

export const ReplyButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  background-image: url("../../assets/icon/reply.png");
`;