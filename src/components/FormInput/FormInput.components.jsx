import React from 'react';
import "./FormInput.styles.scss"
import { Link } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';

const FormInput = ({type, name, value, onChange, label, label2, required, showPwStrength, passwordValue, onChangeScore }) => {
  return (
    <div className="formInput">
      <div className="labels">
        <p className="label">{label}</p>
        {label2 && <Link to="/forgot-password" className="label2">{label2}</Link>}
      </div>
      <input
        type = {type}
        name = {name}
        value = {value}
        onChange={onChange}
        required={required} 
      />
      {showPwStrength && <PasswordStrengthBar password={value} onChangeScore={onChangeScore}/>}
      {passwordValue && <span className="passwordCheckText">{`${(passwordValue !== value) ? "Passwords do not match" : ""}`}</span>}
    </div>
  );
}

export default FormInput;
