import React, { useState, useEffect } from "react";
import { getMatchList } from "../../api/match";
import SelectContainer from "../../components/match/ScheduleSelect";
import TableContainer from "../../components/match/ScheduleTable";
import MatchScheduleTop from "../../components/match/MatchScheduleTop";
import ListContainer from "../../components/match/ScheduleList";

export default function MatchSchedulePage({ isMateListPage, onMatchClick }) {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [view, setView] = useState("list");
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMatchList(year, month);
      setData(result);
    };
    fetchData();
  }, [year, month]);

  const handleMatchClick = (matchId) => {
    setSelectedMatchId(matchId);
  };

  return (
    <div>
      <MatchScheduleTop setView={setView} view={view} />
      <SelectContainer
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        onMatchClick={handleMatchClick} // Prop으로 전달
      />
      <hr style={{ width: "95%", border: "1px solid #f4f4f4" }} />
      {view === "list" && (
        <ListContainer
          data={data}
          isMateListPage={isMateListPage}
          onMatchClick={onMatchClick}
        />
      )}
      {view === "calendar" && (
        <TableContainer
          year={year}
          month={month}
          data={data}
          isMateListPage={true}
          onMatchClick={onMatchClick}
        />
      )}
    </div>
  );
}
