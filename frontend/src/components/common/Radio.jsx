import React from "react";

function Radio({
  children,
  value,
  name,
  defaultChecked,
  setCategory,
  disabled,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onClick={() => setCategory(value)}
      />
      {children}
    </label>
  );
}

export default Radio;
