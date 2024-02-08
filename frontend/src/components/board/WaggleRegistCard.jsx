import React from "react";
import {
  TitleInput,
  TextArea,
  SubmitButton,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  RegistCardContainer,
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
  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;

    // 최대 10개까지 이미지 선택
    const slicedFiles = Array.from(selectedFiles).slice(0, 10);

    // 선택된 파일들을 상태에 저장
    setBoardImages(slicedFiles);
  };

  <FileInput type="file" onChange={handleImageChange} accept="image/*" />;
  return (
    <RegistCardContainer>
      <TitleInput
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <TextArea value={content} onChange={onContentChange} placeholder="내용" />
      <br />
      <FileInputContainer>
        <FileInput
          type="file"
          onChange={onImageChange}
          accept="image/*"
          multiple // 다중 파일 선택 허용
        />
        <FileInputLabel>
          <img src={CameraIcon} alt="Camera Icon" />
        </FileInputLabel>
      </FileInputContainer>
      <br />
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </RegistCardContainer>
  );
}
