import React, {useState} from 'react';
import FormInput from '../../components/FormInput/FormInput.components';
import SelectInput from '../../components/SelectInput/SelectInput.component';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput.component';
import { Link } from 'react-router-dom';
import LongQuestionInput from '../../components/LongQuestionInput/LongQuestionInput.component';
import AuthButton from '../../components/AuthButton/AuthButton.component';

import { app } from '../../firebase';
import firebase from "firebase";

const BenefactorSignUp = ({history}) => {
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
    gestationWeeks: "",
    dietRestrictions: "",

    fullTimeStudent : "",
    attendSchool : "",
    relationshipStatus : "",
    statusInCanada : "",
    daysOfExercise : "",
    smoker : "",
    sourceOfIncome : "",
    sourcesOfHouseholdIncome : "",
    veteranStatus : "",
    indigenousStatus : "",
    visibleMinority : "",
    disabled : "" ,

    trimesterOnebasket : false,
    trimesterTwobasket : false,
    trimesterThreebasket : false,

    twitterUsername: "",
    facebookUsername: "",
    instagramUsername: "",

    signUpDate: new Date().toString().split(" ").slice(0, 4).join(' '),
    approved : false,
    role : "benefactor",
    status : "pending",
    bio : "",
    special : false,
    agreementSignature: false,
    imageUrl: ""
  });

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
      gestationWeeks: "",
      dietRestrictions: "",
  
      fullTimeStudent : "",
      attendSchool : "",
      relationshipStatus : "",
      statusInCanada : "",
      daysOfExercise : "",
      smoker : "",
      sourceOfIncome : "",
      sourcesOfHouseholdIncome : "",
      veteranStatus : "",
      indigenousStatus : "",
      visibleMinority : "",
      disabled : "" ,
      bio : "",
      imageUrl: ""
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = event => {
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

        firebase.database().ref(`benefactors/${u.user.uid}`).set({
          ...userCredentials,
          uid : u.user.uid

        }).then(()=>{
          console.log("Benefactor data add successful")
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

      <LongQuestionInput
        question = "Are you currently a full time student ?"
        name="fullTimeStudent" 
        value={userCredentials.fullTimeStudent}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="partTime">Part Time</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Will you be attending full-time school during/after pregnancy ?"
        name="attendSchool" 
        value={userCredentials.attendSchool}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="partTime">Part Time</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Relationship Status ?"
        name="relationshipStatus" 
        value={userCredentials.relationshipStatus}
        onChange={handleChange}
        required={true}
      >
        <option value="inARelationship">In a relationship</option>
        <option value="single">Single</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "What is your status in Canada ?"
        name="statusInCanada" 
        value={userCredentials.statusInCanada}
        onChange={handleChange}
        required={true}
      >
        <option value="citizen">Citizen</option>
        <option value="permanentResident">Permanent Resident</option>
        <option value="refugee">Refugee</option>
        <option value="notCanadian">Not Canadian</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "How many days do you exercise per week ?"
        name="daysOfExercise" 
        value={userCredentials.daysOfExercise}
        onChange={handleChange}
        required={true}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Do you smoke ?"
        name="smoker" 
        value={userCredentials.smoker}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Do you have a source of income ?"
        name="sourceOfIncome" 
        value={userCredentials.sourceOfIncome}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "How many sources of household income do you have ?"
        name="sourcesOfHouseholdIncome" 
        value={userCredentials.sourcesOfHouseholdIncome}
        onChange={handleChange}
        required={true}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Do you have a veteran status ?"
        name="veteranStatus" 
        value={userCredentials.veteranStatus}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Do you have an Indigenous status?"
        name="indigenousStatus" 
        value={userCredentials.indigenousStatus}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Do you identify as a visible minority ?"
        name="visibleMinority" 
        value={userCredentials.visibleMinority}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </LongQuestionInput>

      <LongQuestionInput
        question = "Do you have a physical or mental disability ?"
        name="disabled" 
        value={userCredentials.disabled}
        onChange={handleChange}
        required={true}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </LongQuestionInput>

      <TextAreaInput
        type = "text" 
        name="gestationWeeks" 
        value={userCredentials.gestationWeeks} 
        onChange={handleChange} 
        label="Weeks of gestation"
      />
      <TextAreaInput 
        type = "text" 
        name="dietRestrictions" 
        value={userCredentials.dietRestrictions} 
        onChange={handleChange} 
        label="Dietary restrictions"
      />
      {error && <span className="authErrorMessage">{error}</span>}
      <div className="spaceBetweenHorizontal authBottomMarginTop">
        <a rel="noreferrer" target="_blank" href="https://firebasestorage.googleapis.com/v0/b/rf-website-v2.appspot.com/o/legalDocs%2FTERMS%20OF%20SERVICE_Website.docx.pdf?alt=media&token=23aa84ad-c185-4490-9959-357eec8d3000" >By Clicking Sign Up you agree to the <span className="authInstructionTextNoColor">Terms and Conditions</span>.</a>
        <AuthButton isLoading={isLoading} buttonText="Sign Up" />
      </div>
    </form>
  );
}

export default BenefactorSignUp;
