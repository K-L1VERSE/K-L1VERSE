import React, { useState } from "react";
import {
  TitleInput,
  TextArea,
  SubmitButton,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  RegistCardContainer,
  InputLabel,
} from "../../styles/BoardStyles/BoardCreateStyle";
import BoardFile from "./BoardFile";

export default function WaggleRegistCard({
  title,
  content,
  onTitleChange,
  onContentChange,
  onFileChange, // onFileChange 추가
  onSubmit,
  buttonText,
}) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (file, result, imageUrl) => {
    // console.log(imageUrl, "!@#!@#!@#!@#");
    onFileChange(imageUrl);
  };

  return (
    <RegistCardContainer>
      <InputLabel>제목</InputLabel>
      <TitleInput
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <InputLabel>내용</InputLabel>
      <TextArea value={content} onChange={onContentChange} placeholder="내용" />
      <br />
      <InputLabel>사진 첨부</InputLabel>
      <BoardFile onFileChange={handleFileChange} />
      {previewImage && (
        <img src={previewImage} alt="미리보기" style={{ maxWidth: "100%" }} />
      )}
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </RegistCardContainer>
  );
}
