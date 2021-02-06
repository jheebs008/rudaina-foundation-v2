import React, { useState} from 'react';
import AuthHeading from '../../components/AuthHeading/AuthHeading.component';
import FormInput from '../../components/FormInput/FormInput.components';
import { Link } from 'react-router-dom';
import AuthButton from '../../components/AuthButton/AuthButton.component';

import { connect } from 'react-redux';

import { app } from '../../firebase';
import firebase from "firebase";
import { ShowToast } from '../../assets/utilities';

const ForgotPassword = () => {
  const [userCredentials, setCredentials] = useState({
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    const { email } = userCredentials;

    app.auth().sendPasswordResetEmail(email).then((u)=> {
      setCredentials({email: ""})
      setIsLoading(false)
      ShowToast("success", `A reset email has been sent to your email , please check your junk too.`)
    }).catch((error) => {
      console.log(error)
      // setError("Please ensure the email you provided is correct.")
      setIsLoading(false)
      ShowToast("error", `There was a problem reseting your email, please ensure your email is corect.`)
    });
  }

  return (
    <div className="forgotPasswordContainer" >
      <div className="forgotPassword" >
        <AuthHeading title="Reset your password ?" subTitle="Please enter your email and have a reset link sent to you" />
        <form  onSubmit={handleSubmit}>
          <FormInput
            type="email" 
            name="email" 
            value={userCredentials.email}
            onChange={handleChange}
            label="Email"
            required={true}
          />
          {error && <span className="authErrorMessage">{error}</span>}
          <div className="spaceBetweenHorizontal authBottomMarginTop">
            <AuthButton isLoading={isLoading} buttonText="Reset" />
            <Link to="/sign-in">I remember my password, <span className="authInstructionText">Sign in</span></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({user : currentUser}) => ({

})

export default connect(null, null)(ForgotPassword);
