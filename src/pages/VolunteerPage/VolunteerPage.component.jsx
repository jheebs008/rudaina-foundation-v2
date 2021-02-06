import React, {useState} from 'react';
import "./VolunteerPage.styles.scss";
import GenericContentDisplay from '../../components/GenericContentDisplay/GenericContentDisplay.components';
import { Link } from 'react-router-dom';

import { REASONS } from './reasons';

const VolunteerPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Volunteer")
  return (
    <div className="AboutPageContainer">
      <div className="MenuContainer">
        {/*<div className="DesignBox">hello</div>*/}
        <div className="Menus">
          <div onClick={()=>setSelectedMenu("Volunteer")} className={`${selectedMenu === "Volunteer" ? "Menu MenuBox1 MenuActive" : "Menu MenuBox1"}`}>
            <i className="fas fa-bullseye"></i>
            <p className="text">Volunteer</p>
          </div>
          <div onClick={()=>setSelectedMenu("Why Us")} className={`${selectedMenu === "Why Us" ? "Menu MenuBox2 MenuActive" : "Menu MenuBox2"}`}>
            <i className="fas fa-book-reader"></i>
            <p className="text">Why Us</p>
          </div>
          <div onClick={()=>setSelectedMenu("Why You")} className={`${selectedMenu === "Why You" ? "Menu MenuBox1 MenuActive" : "Menu MenuBox3"}`}>
            <i className="fas fa-book-reader"></i>
            <p className="text">Why You</p>
          </div>
        </div>
      </div>
      {selectedMenu === "Volunteer" &&
        <GenericContentDisplay image="./img/VolunteerIntro.jpeg" title="Our volunteer program">
          <p className="text">
            If you are seeking a supportive, interactive, and a dynamic environment, then Rudaina Foundation should be your choice to where you will volunteer.
            Your life goals and work objectives are important to us. Your enthusiasm, innovative approaches and new ideas will be very valuable to us. Benefits to joining our team include:
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>ongoing and interactive work .</p>
            </div>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>An opportunity to develop a wealth of contacts and networks .</p>
            </div>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Resume builder workshops .</p>
            </div>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Satisfaction of helping others and more! .</p>
            </div>
          </p>
        </GenericContentDisplay>
      }
      {selectedMenu === "Why Us" &&
        <GenericContentDisplay image="./img/NeedUs.jpeg" title="Why you might need us">
          {
            REASONS[1].reasons.map((reason) => 
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>{reason}</p>
            </div>
            )
          }
        </GenericContentDisplay>
      }
      {selectedMenu === "Why You" &&
        <GenericContentDisplay image="./img/NeedYou.jpeg" title="Why we need you">
          {
            REASONS[0].reasons.map((reason) => 
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>{reason}</p>
            </div>
            )
        }
        <Link to="sign-up" className="LinkButton">Go to sign up</Link>
        </GenericContentDisplay>
      }
    </div>
  );
};

export default VolunteerPage;
