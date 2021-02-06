import React from 'react';
import "./SelectInput.styles.scss";

const SelectInput = ({ name, value, onChange, required, label, children}) => {
  return (
    <div className="formInput">
      <div className="labels">
        <p className="label">{label}</p>
      </div>
      <select value={value} className="selectInput" name={name} required={required} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}

export default SelectInput;
