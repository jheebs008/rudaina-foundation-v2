import React from 'react';
import SelectInput from '../SelectInput/SelectInput.component';

const LongQuestionInput = ({name, value,onChange, required, children, question}) => {
  return (
    <div className="sideBySideLongQuestions longQuestion">
      <p>{question}</p>
      <SelectInput
        name={name} 
        value={value}
        defaultValue={value}
        onChange={onChange}
        required={true}
      >
        <option style={{display:"none"}}></option>
        {children}
      </SelectInput>
    </div>
  );
}

export default LongQuestionInput;
