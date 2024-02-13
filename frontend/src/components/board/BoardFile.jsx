import React, { useRef } from "react";
import {
  FileInput,
  FileInputContainer,
  FileInputLabel,
  FilePreview,
} from "../../styles/BoardStyles/BoardCreateStyle";
import CameraIcon from "../../assets/icon/camera-icon.svg";

import { uploadFile } from "../../api/waggle";

function BoardFile({ value, onFileChange }) {
  const fileInput = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await uploadFile(formData);
          const imageUrl = res.data.url; // 받아온 URL

          onFileChange(file, reader.res, imageUrl);
        } catch (error) {
          console.error("파일 업로드 실패", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <FileInputContainer>
      <FileInput
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        ref={fileInput}
      />
      <FileInputLabel>
        <img
          src={CameraIcon}
          alt="카메라 아이콘"
          onClick={() => fileInput.current.click()}
        />
      </FileInputLabel>
      {value && (
        <FilePreview>
          <img src={value} alt="미리보기" />
        </FilePreview>
      )}
    </FileInputContainer>
  );
}

export default BoardFile;
