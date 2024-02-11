import { BadgeLineContainer } from "../../styles/mypage-styles/badgeStyle";
import BadgeComponent from "./BadgeComponent";

function BadgeGroup({
  codes,
  badgeList,
  badgeNameList,
  badgeCodeList,
  selectedBadge,
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
          selectedBadge={selectedBadge}
          setSelectedBadge={setSelectedBadge}
        />
      ))}
    </BadgeLineContainer>
  );
}

export default BadgeGroup;
