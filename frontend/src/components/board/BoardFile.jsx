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
          <RemoveButton onClick={(event) => handleRemoveImage(index, event)}>
            x
          </RemoveButton>
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
        if (file.size >= 1024 * 1024) {
          Swal.fire({
            html: `
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
              <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">1MB 이하의 파일만 업로드 가능해요!</div>
            `,
            confirmButtonColor: "#3085d6",
            confirmButtonText:
              "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
          });
          return;
        }

        const res = await uploadFile(formData);
        const imageUrl = res.data.url;

        fileUrls.push(imageUrl);
      }

      // 미리보기
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

  return (
    <FileInputContainer>
      <FileInputLabel>
        <img
          src={CameraIcon}
          alt="카메라 아이콘"
          onClick={() => fileInput.current.click()}
        />
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
