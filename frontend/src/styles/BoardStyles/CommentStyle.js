import styled from "styled-components";

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 20px);
  height: 30px;
  margin-bottom: 10px;
  padding: 10px;
  resize: none;
  flex: 1;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const CheckboxInput = styled.input`
  margin-right: 6px;
`;

export const SubmitButton = styled.button`
  background-color: #cdd8ec;
  color: #fff;
  padding: 8px 12px;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  radius: 20px;

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

// CommentList
export const ListContainer = styled.div`
  margin-top: 20px;
`;

export const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-top: 20px;
  margin-left: 40px;
  text-align: left;
  text-decoration: none;
  color: inherit;
`;

export const CommentItem = styled.li`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  list-style: none;
`;

export const CommentContent = styled.p`
  margin-bottom: 10px;
  font-size: 1em;
  line-height: 1.5;
  color: #333;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.button`
  color: #fff;
  padding: 8px 12px;
  font-size: 0.8em;
  border: none;
  cursor: pointer;
  radius: 20px;

  &:hover {
    background-color: #cdd8ec;
  }
`;

export const DeleteButton = styled.button`
  color: #fff;
  padding: 8px 12px;
  font-size: 0.8em;
  border: none;
  cursor: pointer;
  radius: 20px;

  &:hover {
    background-color: #cdd8ec;
  }
`;
