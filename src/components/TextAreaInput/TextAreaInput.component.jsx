import React from 'react';
import "./TextAreaInput.styles.scss"

const TextAreaInput = ({type, name, value, onChange, required, label}) => {
  return (
    <div className="formInput">
      <div className="labels">
        <p className="label">{label}</p>
      </div>
      <textarea className="textAreaInput" type = {type} value={value} name={name} onChange={onChange} required={required} />
    </div>
  );
}

export default TextAreaInput;
