import React, { useState } from "react";
import UnlikeIcon from "../../assets/icon/unlike-icon.png";
import LikeIcon from "../../assets/icon/like-icon.png";
import {
  LikeButton,
  LikeCount,
  LikeBig,
} from "../../styles/BoardStyles/BoardDetailStyle";

const Like = ({ liked, likesCount, handleLikeClick }) => {
  const [localLikeCount, setLocalLikeCount] = useState(likesCount);

  const handleLikeButtonClick = async () => {
    setLocalLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    await handleLikeClick();
  };

  return (
    <LikeBig>
      <LikeButton onClick={handleLikeButtonClick}>
        <img
          src={liked ? LikeIcon : UnlikeIcon}
          alt={liked ? "Like" : "Unlike"}
        />
      </LikeButton>
      <LikeCount>{likesCount}</LikeCount>
    </LikeBig>
  );
};

export default Like;
