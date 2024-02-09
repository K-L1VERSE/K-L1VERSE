import styled from "styled-components";

/* ************* CommentForm ************* */
export const CommentFormContainer = styled.form`
  margin-top: 1rem;
  font-family: "Pretendard-Regular";
  .reply {
    display: flex;
    align-items: center;
  }
  font-family: "Pretendard-Regular";
`;

export const TextContainer = styled.form`
  display: flex;
  margin-top: 0.1rem;
`;

export const TextArea = styled.textarea`
  border: 1px solid lightgray;
  padding: 10px;
  height: 2rem;
  resize: none;
  flex: 1;
  font-family: "Pretendard-Light";
  &:focus {
    outline: none;
  }
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
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: "Pretendard-Regular";
  font-size: 0.86rem;
  div {
    display: flex;
    align-items: center;
  }
  img {
    margin-right: 0.2rem;
  }
  margin-bottom: 0.3rem;
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
  /* border-radius: 20px; */

  height: 3.4rem;
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
`;

/* ************* CommentList ************* */
export const ListContainer = styled.div`
  .title {
    font-size: 0.9rem;
    font-family: "Pretendard-Bold";
    display: flex;
    img {
      margin-right: 0.2rem;
    }
    margin-bottom: 0.7rem;
  }
`;

export const CommentListContainer = styled.div`
  // border: 1px solid #f4f4f4;
`;

export const CommentBig = styled.div`
  border-bottom: 1px solid #f4f4f4;
  margin-bottom: 0.5rem;
`;

export const CommentItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

export const CommentContent = styled.p`
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #5f5f5f;
`;
export const CommentTime = styled.div`
  font-size: 0.5rem;
  margin-top: 0.4rem;
  color: grey;
  margin-left: 0.1rem;
`;

export const CommentWriter = styled.div`
  font-size: 0.9rem;
  color: black;
  margin-top: 0.4rem;
  margin-left: 0.8rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const EditButton = styled.button`
  background-color: #fff;
  color: grey;
  font-size: 0.8em;
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
  font-size: 0.8em;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;
