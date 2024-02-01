import React from "react";
import styled from "styled-components";

export const Form = styled.form`
  margin-top: 20px;
`;

export const Input = styled.input`
  width: 350px;
  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  width: 350px;
  height: 150px;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const WaggleForm = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  buttonText,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <TextArea value={content} onChange={onContentChange} placeholder="내용" />
      <br />
      <SubmitButton type="submit">{buttonText}</SubmitButton>
    </Form>
  );
};

export default WaggleForm;
