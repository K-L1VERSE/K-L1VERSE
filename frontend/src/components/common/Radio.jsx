import React, { useState, useEffect } from "react";

const RadioStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "var(--gray1, #222)",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  cursor: "pointer",
};

const ActiveRadioStyle = {
  ...RadioStyle,
  background: "#FEE8DE",
  borderRadius: "4px",
};

function Radio({
  children,
  value,
  name,
  defaultChecked,
  setCategory,
  disabled,
  selectedValue,
  setSelectedValue,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label style={selectedValue === value ? ActiveRadioStyle : RadioStyle}>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onClick={() => setCategory(value)}
        onChange={(e) => setSelectedValue(e.target.value)}
        style={{ display: "none" }}
      />
      {children}
    </label>
  );
}

export default Radio;
