import React, {useState} from 'react';
import "./SignIn.styles.scss"
import AuthHeading from '../../components/AuthHeading/AuthHeading.component';
import FormInput from '../../components/FormInput/FormInput.components';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { app } from '../../firebase';
import firebase from "firebase";
import AuthButton from '../../components/AuthButton/AuthButton.component';

const SignIn = ({history, currentUser}) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = event => {
    setError("")
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password } = userCredentials;
    app.auth().signInWithEmailAndPassword(email, password).then((u) => {
      console.log("login successful");
      setIsLoading(false);
      setError("")
      // history.push("/dashboard");
    }).catch((err)=>{
      console.log("login un-successful", err);
      setIsLoading(false);
      setError("There was a problem signing in. Please ensure your email and password are correct.")
    })
  }

  return (
    <div className="sigInContainer" >
      <div className="sigIn" >
        <AuthHeading title="Already have an account ?" subTitle="Please sign in with your email and password" />
        <form  onSubmit={handleSubmit}>
          <FormInput
            type="email" 
            name="email" 
            value={userCredentials.email}
            onChange={handleChange}
            label="Email"
            required={true} 
          />
          <FormInput
            type="password" 
            name="password" 
            value={userCredentials.password}
            onChange={handleChange}
            label="Password"
            label2= "Forgot your password ?"
            required={true} 
          />
          {error && <span className="authErrorMessage">{error}</span>}
          <div className="spaceBetweenHorizontal authBottomMarginTop">
            <AuthButton isLoading={isLoading} buttonText="Sign In" />
            <Link to="/sign-up">Don't have an account ? <span className="authInstructionText">Sign up</span></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({user : currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps, null)(SignIn);
