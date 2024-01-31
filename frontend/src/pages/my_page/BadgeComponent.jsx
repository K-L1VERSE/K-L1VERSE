import {
  BadgeBackground,
  BadgeImageStyle,
  BadgeText,
} from "../../styles/mypage-styles/badgeStyle";

function BadgeComponent({
  code,
  badgeList,
  wearBadge,
  handleBuyBadge,
  badgeNameList,
  badgeCodeList,
}) {
  const index = badgeCodeList.indexOf(code);

  const handleClick = () => {
    if (badgeList[index]) {
      wearBadge(index);
    } else {
      handleBuyBadge(index);
    }
  };

  return (
    <BadgeBackground onClick={handleClick}>
      {BadgeImageStyle({ code, isBadgeEarned: badgeList[index] })}
      <BadgeText> {badgeNameList[index]}</BadgeText>
    </BadgeBackground>
  );
}

export default BadgeComponent;
