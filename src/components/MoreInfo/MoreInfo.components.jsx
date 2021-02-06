import React from 'react';
import "./MoreInfo.styles.scss";

import { Link } from "react-router-dom"
import { MORE_INFO_DATA } from './MoreInfo.data';
    

const MoreInfo = () => {
  return (
    <div className="moreInfoContainer">
      <p></p>
      <div className="moreInfo">
        {
          MORE_INFO_DATA.map(({image, title, text, link}, index) => 
            <Link to={link} className={`infoItem ${index === 0 ? "first": ""} ${index === 1 ? "middle": ""} ${index === 2 ? "last": ""}`}>
              <div className="imgContainer animate">
                <img alt="" src={image}/>
              </div>
              <div className="moreInfoText">
                <h3>{title}</h3>
                <p className="info-item-text">{text}</p>
              </div>
            </Link>
          )
        }
      </div>
    </div>
  );
}

export default MoreInfo;
