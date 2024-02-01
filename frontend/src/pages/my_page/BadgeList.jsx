import { BadgeContainer } from "../../styles/mypage-styles/badgeStyle";
import BadgeGroup from "./BadgeGroup";

function BadgeList({
  badgeList,
  wearBadge,
  handleBuyBadge,
  badgeNameList,
  badgeCodeList,
}) {
  const badgesInGroupsOfFour = badgeCodeList.reduce((result, code, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!result[groupIndex]) {
      Object.assign(result, { [groupIndex]: [] });
    }
    result[groupIndex].push(code);
    return result;
  }, []);

  return (
    <BadgeContainer>
      {badgesInGroupsOfFour.map((group) => (
        <BadgeGroup
          key={group[0]}
          codes={group}
          badgeList={badgeList}
          wearBadge={wearBadge}
          handleBuyBadge={handleBuyBadge}
          badgeNameList={badgeNameList}
          badgeCodeList={badgeCodeList}
        />
      ))}
    </BadgeContainer>
  );
}

export default BadgeList;
