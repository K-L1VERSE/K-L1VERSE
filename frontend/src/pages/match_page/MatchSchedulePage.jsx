import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const d = location.state?.d;
  const y = location.state?.y;
  const m = location.state?.m;
  const day = location.state?.day;
  const v = location.state?.v;
  const [selectedDay, setSelectedDayProps] = useState(null);
  const [resetDayFlag, setResetDayFlag] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  const resetDay = () => {
    if (!resetDayFlag) {
      if (selectedDay) {
        setSelectedDayProps(null);
        setResetDayFlag(true);
        console.log("resetDayFlag: ", resetDayFlag);
      }
    }
  };

  useEffect(() => {
    if (d) {
      setYear(y);
      setMonth(m);
      setView(v);
      if (day) {
        setSelectedDayProps(day);
      }
    }
  }, []);

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
        resetDay={resetDay}
        // onMatchClick={handleMatchClick}
      />
      <hr style={{ width: "95%", border: "1px solid #f4f4f4" }} />
      {view === "list" && (
        <ListContainer
          data={data}
          year={year}
          month={month}
          view={view}
          isMateListPage={isMateListPage}
          onMatchClick={onMatchClick}
        />
      )}
      {view === "calendar" && (
        <TableContainer
          year={year}
          setYear={setYear}
          month={month}
          day={selectedDay}
          setResetDayFlag={setResetDayFlag}
          setSelectedDayProps={setSelectedDayProps}
          data={data}
          view={view}
          isMateListPage={isMateListPage}
          onMatchClick={onMatchClick}
        />
        <hr style={{ width: "95%", border: "1px solid #f4f4f4" }} />
        {view === "list" && (
          <ListContainer data={data} year={year} month={month} view={view} />
        )}
        {view === "calendar" && (
          <TableContainer
            year={year}
            month={month}
            day={selectedDay}
            setResetDayFlag={setResetDayFlag}
            setSelectedDayProps={setSelectedDayProps}
            data={data}
            view={view}
          />
        )}
      </div>
    </div>
  );
}
