import React from "react";

export default function SelectContainer({ year, setYear, month, setMonth }) {
  const years = [2024, 2025];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}
