import React, { useState} from 'react';
import "./Footer.styles.scss"

import { Link } from 'react-router-dom';
import firebase from "firebase";
import Notifications, {notify} from 'react-notify-toast';

var uniqid = require('uniqid');

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const addSubscriber = (e) => { 
    e.preventDefault();
    const subscriberId = uniqid();
    firebase.database().ref(`subscribers/${subscriberId}`).set({
      email: email,
      signUpDate: new Date().toString().split(" ").slice(0, 4).join(' '),
      id : subscriberId

    }).then(()=>{
      let myColor = { background: 'green', text: "white" };
      notify.show("Thank you for subscribing !", "custom", 5000, myColor);
      console.log("Benefactor data add successful")
      setEmail("");
    }).catch((err)=>{
      console.log(err)
      notify.show("There was a problem with your subscription.")
    })
  }
  return (
    <div className="footer-container ">
      <Notifications />
      <div className="footer ">
        <div className="footer-info">
          <div className="footer-text">
            <p className="title">Rudaina Foundation</p>
            <p className="footerSection_aboutText">
              Rudaina Foundation is a Canadian charity devoted to helping pregnant women.Our Community Program will introduce professionals like registered nurses, nutritionists, doctors, midwives and therapists to an online message board available for instant access to our beneficiaries.
            </p>
            
          </div>
          <div className="footer-contact">
            <p className="title">Let's keep in touch!</p>
            <p className="title-subText">
              Here at Rudaina Foundation we are always up to something .Find us on any of these platforms to see what we are up to , current event , etc. Also you can join our mailing list !
            </p>
            <form onSubmit={addSubscriber}  action="">
              <div className="formContainer">
                <input className="emailField" name="email" type="email" placeholder="Your email address" value={email} onChange={handleChange} required/><br/>
                <input className="submitButton" type="submit" value="SUBSCRIBE"/>
              </div>
            </form>
            <div className="footer-social">
              <a href="mailto:rudainafoundation@gmail.com?Subject=Hello%20Rudaiana%20Foundation" target="_top">
                <i className="fas fa-envelope"></i>
              </a>
              <a className="link" href="https://www.facebook.com/RudainaFoundation/" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-facebook"></i>
              </a>
              <a className="link" href="https://www.instagram.com/rudainafoundation/" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="link" href="https://twitter.com/RudainaCharity" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a className="link" href="https://ca.linkedin.com/company/rudaina-foundation" rel="noopener noreferrer" target="_blank">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footerLinks-copyright">
          <p>© {new Date().getFullYear()} Rudaina Foundation - <span className="hideOnSmallScreen">Charitable Registration Number : 118830983 RR0001.</span> </p>
          {/*<a href="/privacy-policy" target="_blank">Privacy</a>
          <a href="/terms-of-service" target="_blank">Terms</a>
          <a href="/accesibility" target="_blank">Accessibility</a>*/}
          <div className="rudaina-link">
            <a href="https://firebasestorage.googleapis.com/v0/b/rf-website-v2.appspot.com/o/legalDocs%2FPrivacy%20Policy_Website.docx.pdf?alt=media&token=099c73ff-de2a-4ead-8156-20075328e7e9" rel="noreferrer" className="link"  target="_blank">Privacy</a>
            <a href="https://firebasestorage.googleapis.com/v0/b/rf-website-v2.appspot.com/o/legalDocs%2FTERMS%20OF%20SERVICE_Website.docx.pdf?alt=media&token=23aa84ad-c185-4490-9959-357eec8d3000" rel="noreferrer" className="link" target="_blank">Terms</a>
            <a href="https://firebasestorage.googleapis.com/v0/b/rf-website-v2.appspot.com/o/legalDocs%2FAccessibility_Website.docx.pdf?alt=media&token=986ad160-d745-40ca-be10-88f83a0e5b93" rel="noreferrer" className="link" target="_blank">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;