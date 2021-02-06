import React, { useState } from 'react';
import GenericContentDisplay from '../../components/GenericContentDisplay/GenericContentDisplay.components';

import { Link } from 'react-router-dom';
import "./ProgramPage.styles.scss";

const ProgramPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Basket Program")
  return (
    <div className="AboutPageContainer">
      <div className="MenuContainer">
        {/*<div className="DesignBox">hello</div>*/}
        <div className="Menus">
          <div style={{marginBottom: "6%"}} onClick={()=>setSelectedMenu("Basket Program")} className={`${selectedMenu === "Basket Program" ? "Menu MenuBox1 MenuActive" : "Menu MenuBox1"}`}>
            <i class="fas fa-shopping-basket"></i>
            <p className="text">Our basket program</p>
          </div>
          <div onClick={()=>setSelectedMenu("After Birth")} className={`${selectedMenu === "After Birth" ? "Menu MenuBox1 MenuActive" : "Menu MenuBox1"}`}>
            <i class="fas fa-child"></i>
            <p className="text">After Birth</p>
          </div>
          <div onClick={()=>setSelectedMenu("Our Community")} className={`${selectedMenu === "Our Community" ? "Menu MenuBox2 MenuActive" : "Menu MenuBox2"}`}>
            <i class="fas fa-users"></i>
            <p className="text">Our Community</p>
          </div>
          <div onClick={()=>setSelectedMenu("Sign Up")} className={`${selectedMenu === "Sign Up" ? "Menu MenuBox1 MenuActive" : "Menu MenuBox3"}`}>
            <i class="fas fa-file-alt"></i>
            <p className="text">Sign Up</p>
          </div>
        </div>
      </div>
      {selectedMenu === "Basket Program" &&
        <GenericContentDisplay image="./img/OurMission.jpeg" title="Our life basket program">
          <p className="text">
            An expecting person will be able to register on our website to start receiving a life basket every trimester that will provide tailored information to the individual woman. After completing the registration process, provided with proof of pregnancy via a doctors note, an expecting woman will be eligible to receive a package that is personalized to the applicants: gestational period, age, previous pregnancies, relationship status, social and dietary lifestyle, and household income.
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
      {selectedMenu === "After Birth" &&
        <GenericContentDisplay image="./img/OurStory.jpeg" title="What happens after birth ?">
          <p>
            Rudaina Foundation will provide health-related support to women and families experiencing pregnancy related complications. This support deals with reducing pregnancy related complication costs by providing financial assistance to women fighting risk factors like lack of antenatal care, pregnancy induced hypertension, prolonged second-stages of labor, and delivery by use of instruments or emergency caesarian section. Rudaina will also cover the post-pregnancy treatments of the complications listed in our mission.
              <br/><br/>
            Example treatments Rudaina is expecting to provide financial support for are: Hypothermia therapy; Surgical interventions and medications for cerebral palsy; Speech and language pathology; Physical, behavioural and emotional therapy; Occupational therapy for developing life skills; Massage therapy; Stem cell therapy; and Technologies used for assistance. While some of these treatments are covered under provincial health care, Rudaina will ensure that any costs that exceed insurance coverage is covered on behalf of the applicant. Rudaina will conduct in depth verification regarding the applicants private insurance benefits. This will be done by requesting a copy of their insurance policy.
          </p>
        </GenericContentDisplay>
      }
      {selectedMenu === "Our Community" &&
        <GenericContentDisplay image="./img/OurStory.jpeg" title="Our Community">
          <p>
            By signing up, you get the chance to be part of a community that is nation wide. Expecting women, nutritionists, registered nurses, midwives, and health care practitioners are all part of the conversation. The support is there for whomever seeks it.
          </p>
        </GenericContentDisplay>
      }
      {selectedMenu === "Sign Up" &&
        <GenericContentDisplay image="./img/OurTeam.jpeg" title="Become a benefactor !">
          <p>
          Every birth is different. Sign up now to start receiving life basket tailored to your specific pregnancy. An expecting person is able to start receiving a life basket every trimester, that will provide tailored unique information to each woman. After completing the registration process, provided with proof of pregnancy via a doctors note, an expecting woman will be eligible to receive a package. By registering, the user is making a profile account on our website. This is done so that if any problems occur during pregnancy, there will be an easy-to-follow procedure for an applicant to benefit from our supportive health care programs.
          </p>
          <Link to="sign-up" className="LinkButton">Go to sign up</Link>
        </GenericContentDisplay>
      }
    </div>
  );
}

export default ProgramPage;