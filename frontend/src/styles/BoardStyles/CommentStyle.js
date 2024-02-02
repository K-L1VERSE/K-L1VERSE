import styled from "styled-components";

// CommentForm
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
export const SubmitButton = styled.button`
  background-color: #cdd8ec; /* 예쁜 남색 */
  color: #fff;
  padding: 8px 12px;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  radius: 20px;

  &:hover {
    background-color: #0056b3; /* 더 진한 남색으로 변경 */
  }
`;

export const CancelButton = styled.button`
  background-color: #cdd8ec; /* 회색 */
  color: #000;
  padding: 8px 12px;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  radius: 20px;

  &:hover {
    background-color: #999; /* 더 진한 회색으로 변경 */
  }
`;

// CommentList
export const ListContainer = styled.div`
  margin-top: 20px;
`;

export const CommentItem = styled.li`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  list-style: none; /* Add this line to remove the default list item marker */
`;

export const CommentContent = styled.p`
  margin-bottom: 10px;
  font-size: 1em;
  line-height: 1.5;
  color: #333; /* 원하는 색상으로 변경하세요 */
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
    background-color: #cdd8ec; /* 더 진한 남색으로 변경 */
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
    background-color: #cdd8ec; /* 더 진한 빨간색으로 변경 */
  }
`;
