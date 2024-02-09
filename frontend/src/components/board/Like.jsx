import React, { useState } from "react";
import UnlikeIcon from "../../assets/icon/unlike-icon.png";
import LikeIcon from "../../assets/icon/like-icon.png";
import {
  LikeButton,
  LikeCount,
} from "../../styles/BoardStyles/BoardDetailStyle";

const Like = ({ liked, likesCount, handleLikeClick }) => {
  const [localLikeCount, setLocalLikeCount] = useState(likesCount);

  const handleLikeButtonClick = async () => {
    setLocalLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    await handleLikeClick();
  };

  return (
    <div>
      <LikeButton onClick={handleLikeButtonClick}>
        <img
          src={liked ? LikeIcon : UnlikeIcon}
          alt={liked ? "Like" : "Unlike"}
          style={{ width: "13px", height: "11px" }}
        />
      </LikeButton>
      <LikeCount>{likesCount}</LikeCount>
    </div>
  );
};

export default Like;
