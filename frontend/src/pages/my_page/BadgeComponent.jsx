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
  setSelectedBadge,
}) {
  const index = badgeCodeList.indexOf(code);

  const handleClick = () => {
    console.log(index);
    setSelectedBadge(index);
  };

  return (
    <BadgeBackground onClick={handleClick}>
      {BadgeImageStyle({ code, isBadgeEarned: badgeList[index] })}
      <BadgeText> {badgeNameList[index]}</BadgeText>
    </BadgeBackground>
  );
}

export default BadgeComponent;
