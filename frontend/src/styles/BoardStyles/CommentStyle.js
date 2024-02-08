import styled from "styled-components";

/* ************* CommentList ************* */
export const ListContainer = styled.div`
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

export const CommentListContainer = styled.div`
  /* margin: 1rem; */
`;

export const CommentItem = styled.li`
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  list-style: none;
`;

export const CommentContent = styled.p`
  /* display: flex; */
  margin-bottom: 0.6rem;
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #5f5f5f;
`;
export const CommentTime = styled.div`
  display: flex;
  font-size: 0.5rem;
  color: grey;
  margin-left: 0.1rem;
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
  margin-left: 0.3rem;
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

/* ************* CommentForm ************* */
export const CommentFormContainer = styled.form`
  margin-left: 0.8rem;
  margin-top: 1rem;
  display: flex;
  font-family: "Pretendard-Regular";
  background-color: aquamarine;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  resize: none;
  flex: 1;
  border-radius: 7px;
`;

// 댓글 수정창
export const CommentInput = styled.input`
  width: inherit;
  margin-left: 0.8rem;
  padding: 8px;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  margin-right: 6px;
`;

export const SubmitButton = styled.button`
  background-color: #cdd8ec;
  color: #fff;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  border-radius: 20px;

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
  radius: 20px;

  &:hover {
    background-color: #999;
  }
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

  &:hover {
    background-color: #45a049;
  }
`;
