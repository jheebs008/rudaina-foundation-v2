import React, { useState } from 'react';
import "./SignUp.styles.scss"
import AuthHeading from '../../components/AuthHeading/AuthHeading.component';
import FormInput from '../../components/FormInput/FormInput.components';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput.component';
import SelectInput from '../../components/SelectInput/SelectInput.component';
import VolunteerSignUp from './VolunteerSignUp.component';
import BenefactorSignUp from './BenefactorSignUp.component';

const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState("")

  return (
    <div>
      <div className="sigUpContainer" >
        <div className="sigUp" >
          <AuthHeading title="Don't have an account ?" subTitle="Please sign up by correctly filling the form below." />
          <div className="selectOption">
            <div className="options">
              <div className={selectedOption === "volunteer" ? "option optionActive" : "option "} onClick={()=>setSelectedOption("volunteer")}>
                <div style={{backgroundImage: 'url("./img/volunteer.jpeg")', backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }} className="option-inner">
                  <h3 className="option-title">{selectedOption === "volunteer" ? "Become A Volunteer" : "Volunteer"}</h3>
                </div>
                <span className="option-text">Become a volunteer and join an amazing community of like minded people wanting to make a difference.</span>
              </div>

              <div className={selectedOption === "benefactor" ? "option optionActive" : "option "} onClick={()=>setSelectedOption("benefactor")}>
                <div style={{backgroundImage: 'url("./img/pregnant-woman.jpeg")', backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }} className="option-inner">
                  <h3 className="option-title">{selectedOption === "benefactor" ? "Become A Benefactor" : "Benefactor"}</h3>
                </div>
                <span className="option-text">If you are pregnant. By signing up , you would be able to receive benefits in form of care baskets</span>
              </div>
            </div>
          </div>

          {selectedOption === "volunteer" && <VolunteerSignUp />}
          {selectedOption === "benefactor" && <BenefactorSignUp/> }
        </div>
      </div>
    </div>
  );
}

export default SignUp;
