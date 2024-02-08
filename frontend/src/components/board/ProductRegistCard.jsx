import React from "react";
import {
  TitleInput,
  TextArea,
  PriceInput,
  SubmitButton,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  RegistCardContainer,
  InputLabel,
} from "../../styles/BoardStyles/BoardCreateStyle";
import CameraIcon from "../../assets/icon/camera-icon.svg";
import {
  FlagInputContainer,
  FlagInputLabel,
  FlagInputCheckbox,
  FlagInputText,
} from "../../styles/BoardStyles/BoardCreateStyle";

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
      <InputLabel>판매 물건</InputLabel>
      <TitleInput
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <br />
      <InputLabel>판매 가격</InputLabel>
      <PriceInput
        type="text"
        value={price}
        onChange={onPriceChange}
        placeholder="가격"
      />
      <br />
      <InputLabel>내용</InputLabel>
      <TextArea value={content} onChange={onContentChange} placeholder="내용" />
      <br />
      <FlagInputContainer>
        <FlagInputLabel>
          <FlagInputCheckbox
            type="checkbox"
            checked={dealFlag}
            onChange={onDealFlagChange}
          />
          <FlagInputText>판매중</FlagInputText>
        </FlagInputLabel>
      </FlagInputContainer>
      <br />
      <InputLabel>사진 첨부</InputLabel>
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
