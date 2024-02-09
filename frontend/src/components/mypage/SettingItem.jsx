import React, { useState } from "react";
import {
  SettingItemWrap,
  Text,
  OuterCircle,
  InnerCircle,
  AlignItem,
} from "../../styles/mypage-styles/SettingStyle";

export default function SettingItem({
  type,
  src,
  text,
  goLogin,
  notificationFlag,
  updateNotificationFlag,
}) {
  const handleClick = () => {
    updateNotificationFlag();
  };

  return (
    <SettingItemWrap onClick={goLogin}>
      <AlignItem>
        <img src={src} alt="icon" />
        <Text color={type}>{text}</Text>
      </AlignItem>

      {type === "notification" && (
        <OuterCircle $notificationFlag={notificationFlag} onClick={handleClick}>
          <InnerCircle $notificationFlag={notificationFlag} />
        </OuterCircle>
      )}
    </SettingItemWrap>
  );
}
