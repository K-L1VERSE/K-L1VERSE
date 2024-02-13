import React from "react";
import {
  TitleInput,
  TextArea,
  SubmitButton,
  RegistCardContainer,
  InputLabel,
} from "../../styles/BoardStyles/BoardCreateStyle";
import BoardFile from "./BoardFile";

export default function WaggleRegistCard({
  title,
  content,
  onTitleChange,
  onContentChange,
  boardImage,
  onFileChange, // onFileChange 수정
  onSubmit,
  buttonText,
}) {
  const handleFileChange = (files, allFileUrls) => {
    onFileChange(allFileUrls); // 전체 파일 URL 배열을 전달
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
      <BoardFile value={boardImage} onFileChange={handleFileChange} />
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </RegistCardContainer>
  );
}
