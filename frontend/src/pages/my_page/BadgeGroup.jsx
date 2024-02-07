import { BadgeLineContainer } from "../../styles/mypage-styles/badgeStyle";
import BadgeComponent from "./BadgeComponent";

function BadgeGroup({
  codes,
  badgeList,
  badgeNameList,
  badgeCodeList,
  setSelectedBadge,
}) {
  return (
    <BadgeLineContainer>
      {codes.map((code) => (
        <BadgeComponent
          key={code}
          code={code}
          badgeList={badgeList}
          badgeNameList={badgeNameList}
          badgeCodeList={badgeCodeList}
          setSelectedBadge={setSelectedBadge}
        />
      ))}
    </BadgeLineContainer>
  );
}

export default BadgeGroup;
