import React, { useState, useEffect } from "react";
import { getMatchList } from "../../api/match";
import SelectContainer from "../../components/match/ScheduleSelect";
import TableContainer from "../../components/match/ScheduleTable";
import MatchScheduleTop from "../../components/match/MatchScheduleTop";
import ListContainer from "../../components/match/ScheduleList";

export default function MatchSchedulePage() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [view, setView] = useState("list");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMatchList(year, month);
      setData(result);
    };
    fetchData();
  }, [year, month]);

  return (
    <div>
      <MatchScheduleTop setView={setView} view={view} />
      <SelectContainer
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      <hr style={{ width: "95%" }} />
      {view === "list" && <ListContainer data={data} />}
      {view === "calendar" && (
        <TableContainer year={year} month={month} data={data} />
      )}
    </div>
  );
}
