import React from "react";
import {
  TitleInput,
  TextArea,
  PriceInput,
  SubmitButton,
  RegistCardContainer,
  InputLabel,
  ToggleContainer,
  OuterCircle,
  InnerCircle,
  DealFlagText,
} from "../../styles/BoardStyles/BoardCreateStyle";
import BoardFile from "./BoardFile";

export default function ProductRegistCard({
  title,
  content,
  price,
  dealFlag,
  onTitleChange,
  onContentChange,
  onPriceChange,
  onDealFlagChange,
  boardImage,
  onFileChange,
  onSubmit,
  buttonText,
  handleDealFlag,
  setBoardImage,
}) {
  const handleFileChange = (files, allFileUrls) => {
    if (allFileUrls.length === 0) {
      setBoardImage(null);
    } else {
      onFileChange(allFileUrls);
    }
  };

  const handlePriceChange = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      onPriceChange(event);
    }
  };

  return (
    <div>
      <ToggleContainer>
        <OuterCircle $dealFlag={!dealFlag} onClick={handleDealFlag}>
          <InnerCircle $dealFlag={!dealFlag} />
        </OuterCircle>
        <DealFlagText>{dealFlag ? "거래완료" : "판매중"}</DealFlagText>
      </ToggleContainer>

      <RegistCardContainer>
        {/* <InputLabel>판매 물건</InputLabel> */}
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
          onChange={handlePriceChange}
          placeholder="Price"
        />
        <br />
        <InputLabel>사진 첨부</InputLabel>
        <BoardFile value={boardImage} onFileChange={handleFileChange} />
        <br />
        {/* <InputLabel>내용</InputLabel> */}
        <TextArea
          value={content}
          onChange={onContentChange}
          placeholder="상세 내용"
        />
        <br />
        {/* <FlagInputContainer>
          <FlagInputLabel>
            <FlagInputCheckbox
              type="checkbox"
              checked={dealFlag}
              onChange={onDealFlagChange}
            />
          </FlagInputLabel>
        </FlagInputContainer> */}

        <br />
        <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
      </RegistCardContainer>
    </div>
  );
}
