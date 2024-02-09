import React, { useState } from "react";
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
import {
  FlagInputContainer,
  FlagInputLabel,
  FlagInputCheckbox,
  FlagInputText,
} from "../../styles/BoardStyles/BoardCreateStyle";
import BoardFile from "./BoardFile";

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
  onFileChange,
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
      <InputLabel>사진 첨부</InputLabel>
      <BoardFile onFileChange={handleFileChange} />
      {previewImage && (
        <img src={previewImage} alt="미리보기" style={{ maxWidth: "100%" }} />
      )}
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
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </RegistCardContainer>
  );
}
