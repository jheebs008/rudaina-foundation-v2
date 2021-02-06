import React, {useState} from 'react';
import FormInput from '../../components/FormInput/FormInput.components';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput.component';
import SelectInput from '../../components/SelectInput/SelectInput.component';
import AuthButton from '../../components/AuthButton/AuthButton.component';
import { withRouter } from 'react-router-dom';

import { app } from '../../firebase';
import firebase from "firebase";

const VolunteerSignUp = ({history}) => {
  const [userCredentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: "",
    password: '',
    reEnterPassword: "",
    homeAddress: "",
    apartmentUnit: "",
    city: "",
    postalCode: "",
    province: "",
    dateOfBirth: "",
    volunteerReason: "",
    help: "",

    twitterUsername: "",
    facebookUsername: "",
    instagramUsername: "",

    signUpDate: new Date().toString().split(" ").slice(0, 4).join(' '),
    approved : false,
    role : "volunteer",
    status : "pending",
    bio : "",
    special : false,
    agreementSignature: false,
    imageUrl: ""
  });

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  const clearCredentials = () => {
    setCredentials({
      ...userCredentials,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: "",
      password: '',
      reEnterPassword: "",
      homeAddress: "",
      apartmentUnit: "",
      city: "",
      postalCode: "",
      province: "",
      dateOfBirth: "",
      volunteerReason: "",
      help: "",
    })
  }

  const handleChange = event => {
    setError("")
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (passwordStrength < 3) {
      console.log("password strength",passwordStrength,passwordStrength < 3 )
      setError("There was a problem creating your account. Please ensure your password is strong");
      setIsLoading(false);
      
    } else {
      console.log("passed")
      const { firstName, lastName, phoneNumber, email, password, reEnterPassword, homeAddress, apartmentUnit, city, postalCode, province, dateOfBirth, volunteerReason, help } = userCredentials;
    
      app.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log("SignUp successful");
        console.log(u);

        firebase.database().ref(`volunteers/${u.user.uid}`).set({
            ...userCredentials,
            uid : u.user.uid

        }).then(()=>{
          console.log("volunteer data add successful")
          setIsLoading(false);
          setError("")
          clearCredentials()
          history.push("/dashboard")
        }).catch((err)=>{
          console.log(err)
          setIsLoading(false);
          setError("There was a problem creating your account.")
        })
      }).catch((err)=>{
          console.log(err)
          setIsLoading(false);
          setError("There was a problem creating your account.")
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="sideBySide">
        <FormInput
          type="text" 
          name="firstName" 
          value={userCredentials.firstName}
          onChange={handleChange}
          label="First Name"
          required={true}
        />
        <FormInput
          type="text" 
          name="lastName" 
          value={userCredentials.lastName}
          onChange={handleChange}
          label="Last Name"
          required={true}
        />
        <FormInput
          type="text" 
          name="phoneNumber" 
          value={userCredentials.phoneNumber}
          onChange={handleChange}
          label="Phone"
          required={true}
        />
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
          showPwStrength
          onChangeScore = {setPasswordStrength}
          required={true}
        />
        <FormInput
          type="password" 
          name="reEnterPassword" 
          value={userCredentials.reEnterPassword}
          passwordValue={userCredentials.password}
          onChange={handleChange}
          label="Re-Enter Password"
          required={true}
        />
        <FormInput
          type="date" 
          name="dateOfBirth" 
          value={userCredentials.dateOfBirth}
          onChange={handleChange}
          label="Birthday"
          required={true}
        />
        <SelectInput
          name="province" 
          value={userCredentials.province}
          onChange={handleChange}
          label="Province"
          required={false}
        >
          <option value="ontario">Ontario</option>
          <option value="quebec">Quebec</option>
          <option value="yukon">Yukon</option>
          <option value="manitoba">Manitoba</option>
          <option value="alberta">Alberta</option>
          <option value="british columbia">British Columbia</option>
          <option value="nova scotia">Nova Scotia</option>
          <option value="prince edward island">Prince Edward Island</option>
          <option value="new brunswick">New Brunswick</option>
          <option value="saskatchewan">Saskatchewan</option>
          <option value="nunavut">Nunavut</option>
          <option value="northwest territories">Northwest Territories</option>
          <option value="newfoundland and labrador">Newfoundland and Labrador</option>
        </SelectInput>
        <FormInput
          type="text" 
          name="homeAddress" 
          value={userCredentials.homeAddress}
          onChange={handleChange}
          label="Home Address"
          required={true}
        />
        <FormInput
          type="text" 
          name="apartmentUnit" 
          value={userCredentials.apartmentUnit}
          onChange={handleChange}
          label="Apartment Unit"
          required={true}
        />
        <FormInput
          type="text" 
          name="city" 
          value={userCredentials.city}
          onChange={handleChange}
          label="City"
          required={true}
        />
        <FormInput
          type="text" 
          name="postalCode" 
          value={userCredentials.postalCode}
          onChange={handleChange}
          label="Postal Code"
          required={true}
        />
      </div>
      <TextAreaInput 
        type = "text" 
        name="volunteerReason" 
        value={userCredentials.volunteerReason} 
        onChange={handleChange} 
        required 
        label="Why do you want to volunteer"
      />
      <TextAreaInput 
        type = "text" 
        name="help" 
        value={userCredentials.help} 
        onChange={handleChange} 
        required 
        label="How can you help"
      />
      {error && <span className="authErrorMessage">{error}</span>}
      <div className="spaceBetweenHorizontal authBottomMarginTop">
        <a rel="noreferrer" target="_blank" href="https://firebasestorage.googleapis.com/v0/b/rf-website-v2.appspot.com/o/legalDocs%2FTERMS%20OF%20SERVICE_Website.docx.pdf?alt=media&token=23aa84ad-c185-4490-9959-357eec8d3000" >By Clicking Sign Up you agree to the <span className="authInstructionTextNoColor">Terms and Conditions</span>.</a>
        <AuthButton isLoading={isLoading} buttonText="Sign Up" />
      </div>
    </form>
  );
}

export default withRouter(VolunteerSignUp);
