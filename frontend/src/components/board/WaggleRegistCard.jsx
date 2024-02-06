import React from "react";
import {
  Input,
  TextArea,
  SubmitButton,
  FileInputContainer,
  FileInput,
  FileInputLabel,
} from "../../styles/BoardStyles/BoardCreateStyle";
import CameraIcon from "../../assets/icon/camera-icon.svg";

export default function WaggleRegistCard({
  title,
  content,
  onTitleChange,
  onContentChange,
  onImageChange,
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
      <br />
      <FileInputContainer>
        <FileInput type="file" onChange={onImageChange} accept="image/*" />
        <FileInputLabel>
          <img src={CameraIcon} alt="Camera Icon" />
        </FileInputLabel>
      </FileInputContainer>
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </>
  );
}
