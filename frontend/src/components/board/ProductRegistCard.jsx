import React from "react";
import {
  TitleInput,
  TextArea,
  PriceInput,
  FlagInput,
  SubmitButton,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  RegistCardContainer,
} from "../../styles/BoardStyles/BoardCreateStyle";
import CameraIcon from "../../assets/icon/camera-icon.svg";

export default function ProductRegistCard({
  title,
  content,
  price,
  dealFlag,
  boardImage,
  onTitleChange,
  onContentChange,
  onPriceChange,
  onDealFlagChange,
  onImageChange,
  onSubmit,
  buttonText,
}) {
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
      <PriceInput
        type="number"
        value={price}
        onChange={onPriceChange}
        placeholder="가격"
      />
      <FlagInput
        type="checkbox"
        checked={dealFlag}
        onChange={onDealFlagChange}
      />
      판매중
      <br />
      <FileInputContainer>
        <FileInput
          type="file"
          value={boardImage}
          onChange={onImageChange}
          accept="image/*"
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
