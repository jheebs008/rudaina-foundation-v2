import React from 'react';
import { Link } from 'react-router-dom';
import "./SubHeader.styles.scss";

const SubHeader = () => {
  return (
    <div className="SubheaderContainer">
      <div className="Subheader">
        <div className="ctaBox">
          <p className="slogan">We are <span className="different">Trying</span> to make a</p>
          <p className="slogan"><span className="different modify">Difference</span></p>
          <p className="text">
            Behind our charity is a community of amazing people like you !
          </p>
          <div className="buttonContainer">
            <Link to="volunteer" className="button">Learn More</Link>
          </div>
        </div>
        <div className="imageBox">
          <img alt="" src="./img/smiley.svg"/>
        </div> 
      </div>
    </div>
  );
}

export default SubHeader;
