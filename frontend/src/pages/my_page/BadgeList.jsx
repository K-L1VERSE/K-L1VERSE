import { BadgeContainer } from "../../styles/mypage-styles/badgeStyle";
import BadgeGroup from "./BadgeGroup";

function BadgeList({
  badgeList,
  badgeNameList,
  badgeCodeList,
  setSelectedBadge,
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
          badgeNameList={badgeNameList}
          badgeCodeList={badgeCodeList}
          setSelectedBadge={setSelectedBadge}
        />
      ))}
    </BadgeContainer>
  );
}

export default BadgeList;
