import { useState } from "react";
import {
  BadgeBackground,
  BadgeImageStyle,
  BadgeText,
} from "../../styles/mypage-styles/badgeStyle";

function BadgeComponent({
  code,
  badgeList,
  badgeNameList,
  badgeCodeList,
  selectedBadge,
  setSelectedBadge,
}) {
  const index = badgeCodeList.indexOf(code);

  const handleClick = () => {
    setSelectedBadge(index);
  };

  return (
    <BadgeBackground
      onClick={handleClick}
      $isSelected={code === badgeCodeList[selectedBadge]}
    >
      {BadgeImageStyle({ code, isBadgeEarned: badgeList[index] })}
      <BadgeText> {badgeNameList[index]}</BadgeText>
    </BadgeBackground>
  );
}

export default BadgeComponent;
