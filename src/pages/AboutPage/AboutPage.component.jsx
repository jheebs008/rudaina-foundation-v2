import React, { useState } from 'react';
import GenericContentDisplay from '../../components/GenericContentDisplay/GenericContentDisplay.components';
import "./AboutPage.styles.scss";
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Story")
  return (
    <div className="AboutPageContainer">
      <div className="MenuContainer">
        {/*<div className="DesignBox">hello</div>*/}
        <div className="Menus">
          <div onClick={()=>setSelectedMenu("Story")} className={`${selectedMenu === "Story" ? "Menu MenuBox1 MenuActive" : "Menu MenuBox1"}`}>
            <i className="fas fa-book-reader"></i>
            <p className="text">Our Story</p>
          </div>
          <div onClick={()=>setSelectedMenu("Mission")} className={`${selectedMenu === "Mission" ? "Menu MenuBox2 MenuActive" : "Menu MenuBox2"}`}>
            <i className="fas fa-bullseye"></i>
            <p className="text">Our Mission</p>
          </div>
          <div onClick={()=>setSelectedMenu("Team")} className={`${selectedMenu === "Team" ? "Menu MenuBox1 MenuActive" : "Menu MenuBox3"}`}>
            <i class="fas fa-users"></i>
            <p className="text">Our Team</p>
          </div>
        </div>
      </div>
      {selectedMenu === "Story" &&
        <GenericContentDisplay image="./img/OurMission.jpeg" title="A message from the CEO">
          <p className="text">
            I wanted to take a minute and explain the name of this foundation. Rudaina was the name of my cousin. She suffered from Infant Hypoxic Ischemic Encephalopathy (HIE) as a result of pregnancy related complications. The doctors gave her a life expectancy of just a couple of years. In 2017, she passed away at the age of 20. Her life was a miracle, she defied all odds.<br/><br/>
            Even though Rudaina couldn’t speak, was paralyzed from the neck down, and bed written her whole life, she always had a smile on her face. I remember playing games with her at a young age, some of my most cherished memories. After she passed, I was inspired by the pain it brought me that I made it my mission to try and help other families that are going through something similar.<br/><br/>
            The Rudaina Foundation will not just focus on HIE cases, it will develop and grow to help anyone that is going through something so emotional and painful during the most beautiful process of life. Whether that help comes from financial resources or through a foundation that can provide support, Rudaina will always be in my heart and will forever fuel my fire to help and contribute all my potential to someone in need.
          </p>
          {/*<div className="ceoContainer">
            <div className="ceoContainer">
              image
            </div>
            <div className="ceoContainer">
              <h3>Aslam Yehia</h3>
              <p>CEO of rudiana foundation</p>
            </div>
          </div>*/}
        </GenericContentDisplay>
      }
      {selectedMenu === "Mission" &&
        <GenericContentDisplay image="./img/OurStory.jpeg" title="Our Mission">
          <p>
            Founded in 2017, the objective of the Rudaina Foundation is to promote health by providing support and information to vulnerable, low income, or indigenous pregnant women, that will enable them to take action and adopt specific behaviors that can help reduce the chances of pregnancy related complications. <br/><br/>
            One of our goals is to provide informational, social, and financial* support to women who are experiencing pregnancy related complications in the form of Cerebral Palsy, Infant Hypoxic-Ischemic Encephalopathy (HIE), Anemia, and Pre-Term Births. *Directly for doctor approved therapy treatments and healthcare modalities
          </p>
        </GenericContentDisplay>
      }
      {selectedMenu === "Team" &&
        <GenericContentDisplay image="./img/OurTeam.jpeg" title="Page coming soon">
          <p>
            Page coming soon
          </p>
        </GenericContentDisplay>
      }
    </div>
  );
}

export default AboutPage;