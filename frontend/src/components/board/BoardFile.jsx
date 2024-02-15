import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FileInput,
  FileInputContainer,
  FileInputLabel,
  FilePreview,
  RemoveButton,
} from "../../styles/BoardStyles/BoardCreateStyle";
import CameraIcon from "../../assets/icon/camera-icon.svg";
import { uploadFile } from "../../api/waggle";
import imageCompression from "browser-image-compression";

function BoardFile({ onFileChange, value }) {
  const fileInput = useRef(null);
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    if (value) {
      const imageUrls = value.split(",");
      const previews = imageUrls.map((url, index) => (
        <FilePreview key={url}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <img
                src={url}
                alt={`미리보기 - Image ${index + 1}`}
                style={{
                  width: "45px",
                  height: "45px",
                }}
              />
            </div>
            <div>
              <RemoveButton
                onClick={(event) => handleRemoveImage(index, event)}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                삭제
              </RemoveButton>
            </div>
          </div>
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

        // 이미지 압축
        const compressedFile = await compressImage(file);
        const formData = new FormData();
        formData.append("file", compressedFile);

        const res = await uploadFile(formData);
        const imageUrl = res.data.url;

        fileUrls.push(imageUrl);
      }

      // 미리보기 업데이트
      const previews = fileUrls.map((url, index) => (
        <FilePreview key={url}>
          <img src={url} alt={`미리보기 - ${files[index].name}`} />
          <RemoveButton onClick={(event) => handleRemoveImage(index, event)}>
            x
          </RemoveButton>
        </FilePreview>
      ));

      const allFileUrls = fileUrls.join(",");
      setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      onFileChange(files, allFileUrls);
    }

    if (fileInput.current) {
      fileInput.current.value = null;
    }
  };

  const handleRemoveImage = (indexToRemove, event) => {
    event.preventDefault();

    setFilePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(indexToRemove, 1);

      const remainingUrls = newPreviews.map((preview) => preview.key);
      onFileChange([], remainingUrls.join(","));
      return newPreviews;
    });
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Image compression error:", error);
      return file;
    }
  };

  return (
    <FileInputContainer>
      <FileInputLabel onClick={() => fileInput.current.click()}>
        <img src={CameraIcon} alt="카메라 아이콘"></img>
      </FileInputLabel>
      <FileInput
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInput}
        style={{ display: "none" }}
        multiple
      />
      {filePreviews}
    </FileInputContainer>
  );
}

export default BoardFile;
