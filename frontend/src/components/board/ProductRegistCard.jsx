import React from "react";
import {
  Input,
  TextArea,
  SubmitButton,
} from "../../styles/BoardStyles/BoardCreateStyle";

export default function ProductRegistCard({
  title,
  content,
  price,
  dealFlag,
  onTitleChange,
  onContentChange,
  onPriceChange,
  onDealFlagChange,
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
      <Input
        type="number"
        value={price}
        onChange={onPriceChange}
        placeholder="가격"
      />
      <input type="checkbox" checked={dealFlag} onChange={onDealFlagChange} />
      거래 가능
      <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
    </>
  );
}
