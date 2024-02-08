import React, { useState } from "react";
import UnlikeIcon from "../../assets/icon/unlike-icon.png";
import LikeIcon from "../../assets/icon/like-icon.png";
import {
  LikeButton,
  LikeCount,
} from "../../styles/BoardStyles/BoardDetailStyle";

const Like = ({ isLiked, initialLikeCount, handleLikeClick }) => {
  const [localLikeCount, setLocalLikeCount] = useState(initialLikeCount);

  const handleLikeButtonClick = async () => {
    setLocalLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    await handleLikeClick();
  };

  return (
    <div>
      <LikeButton onClick={handleLikeButtonClick}>
        <img
          src={isLiked ? LikeIcon : UnlikeIcon}
          alt={isLiked ? "Like" : "Unlike"}
          style={{ width: "17px", height: "15px" }}
        />
      </LikeButton>
      <LikeCount>좋아요 {localLikeCount}개</LikeCount>
    </div>
  );
};

export default Like;
