import React, { useState } from "react";
import {
  SettingItemWrap,
  Text,
  OuterCircle,
  InnerCircle,
  AlignItem,
} from "../../styles/mypage-styles/SettingStyle";

export default function SettingItem({ type, src, text }) {
  const [isToggled, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!isToggled);
  };

  return (
    <SettingItemWrap>
      <AlignItem>
        <img src={src} alt="icon" />
        <Text color={type}>{text}</Text>
      </AlignItem>

      {type === "notification" && (
        <OuterCircle isOn={isToggled} onClick={handleClick}>
          <InnerCircle isOn={isToggled} />
        </OuterCircle>
      )}
    </SettingItemWrap>
  );
}
