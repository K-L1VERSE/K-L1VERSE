import { BadgeLineContainer } from "../../styles/mypage-styles/badgeStyle";
import BadgeComponent from "./BadgeComponent";

function BadgeGroup({
  codes,
  badgeList,
  wearBadge,
  handleBuyBadge,
  badgeNameList,
  badgeCodeList,
}) {
  return (
    <BadgeLineContainer>
      {codes.map((code) => (
        <BadgeComponent
          key={code}
          code={code}
          badgeList={badgeList}
          wearBadge={wearBadge}
          handleBuyBadge={handleBuyBadge}
          badgeNameList={badgeNameList}
          badgeCodeList={badgeCodeList}
        />
      ))}
    </BadgeLineContainer>
  );
}

export default BadgeGroup;
