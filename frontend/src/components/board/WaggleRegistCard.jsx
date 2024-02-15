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
  onFileChange,
  onSubmit,
  buttonText,
  setBoardImage,
}) {
  const handleFileChange = (files, allFileUrls) => {
    if (allFileUrls.length === 0) {
      setBoardImage(null);
    } else {
      onFileChange(allFileUrls);
    }
  };

  return (
    <RegistCardContainer>
      <TitleInput
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <TextArea
        value={content}
        onChange={onContentChange}
        placeholder="상세 내용"
      />
      <br />
      <InputLabel>사진 첨부</InputLabel>
      <BoardFile value={boardImage} onFileChange={handleFileChange} />
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </RegistCardContainer>
  );
}
