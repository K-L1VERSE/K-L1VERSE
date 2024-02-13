import React, { useRef, useState, useEffect } from "react";
import {
  FileInput,
  FileInputContainer,
  FileInputLabel,
  FilePreview,
} from "../../styles/BoardStyles/BoardCreateStyle";
import CameraIcon from "../../assets/icon/camera-icon.svg";
import { uploadFile } from "../../api/waggle";

function BoardFile({ onFileChange, value }) {
  const fileInput = useRef(null);
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    // value가 변경되면 미리보기 업데이트
    if (value) {
      const imageUrls = value.split(",");
      const previews = imageUrls.map((url, index) => (
        <FilePreview key={url}>
          <img src={url} alt={`미리보기 - Image ${index + 1}`} />
        </FilePreview>
      ));
      setFilePreviews(previews);
    }
  }, [value]);

  const handleImageChange = async (event) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      const fileUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadFile(formData);
        const imageUrl = res.data.url;

        fileUrls.push(imageUrl);
      }

      // 각 파일에 대한 미리보기 추가
      const previews = fileUrls.map((url, index) => (
        <FilePreview key={url}>
          <img src={url} alt={`미리보기 - ${files[index].name}`} />
        </FilePreview>
      ));

      // 모든 파일 업로드가 완료되면 onFileChange 호출
      const allFileUrls = fileUrls.join(",");
      setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      onFileChange(files, allFileUrls);
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
        multiple
      />
      <FileInputLabel>
        <img
          src={CameraIcon}
          alt="카메라 아이콘"
          onClick={() => fileInput.current.click()}
        />
      </FileInputLabel>
      {filePreviews}
    </FileInputContainer>
  );
}

export default BoardFile;
