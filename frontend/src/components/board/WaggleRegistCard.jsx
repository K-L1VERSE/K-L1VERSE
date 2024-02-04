import React from "react";
import {
  Input,
  TextArea,
  SubmitButton,
} from "../../styles/BoardStyles/BoardCreateStyle";

export default function WaggleRegistCard({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  buttonText,
}) {
  return (
    <>
      <Input
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <TextArea value={content} onChange={onContentChange} placeholder="내용" />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </>
  );
}
