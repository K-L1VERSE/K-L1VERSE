import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getMatchList } from "../../../api/match";
import SelectContainer2 from "./ScheduleSelect2";
import TableContainer2 from "./ScheduleTable2";

export default function ScheduleModal({
  isMateListPage,
  onMatchClick,
  selectedMatchId,
  setSelectedMatch,
}) {
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

  const resetDay = () => {
    if (!resetDayFlag) {
      if (selectedDay) {
        setSelectedDayProps(null);
        setResetDayFlag(true);
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

  return (
    <div>
      <SelectContainer2
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        resetDay={resetDay}
      />
      <TableContainer2
        year={year}
        month={month}
        day={selectedDay}
        setResetDayFlag={setResetDayFlag}
        setSelectedDayProps={setSelectedDayProps}
        data={data}
        view={view}
        isMateListPage={isMateListPage}
        onMatchClick={onMatchClick}
        selectedMatchId={selectedMatchId}
        setSelectedMatch={setSelectedMatch}
      />
    </div>
  );
}
