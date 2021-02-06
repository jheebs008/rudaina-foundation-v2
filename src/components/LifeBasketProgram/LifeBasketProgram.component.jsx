import React from 'react';
import "./LifeBasketProgram.styles.scss";
import { Link } from 'react-router-dom';

const LifeBasketProgram = () => {
  return (
    <div className="lifeBasketProgramContainer">
      <div className="lifeBasketProgram">
        <div className="basket">
          <div style={{ backgroundImage: "url(" + "https://images.unsplash.com/photo-1589476304891-49f5488b7840?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" + ")", backgroundRepeat : "no-repeat", backgroundSize : "100% 100%"}} className="basket-info-image-large">
            <div className="basket-info-image-medium">
              <img alt="" src="./img/community.jpeg"/>
            </div>
            <div className="basket-info-image-small">
              <img alt="" src="./img/volunteer.jpeg"/>
            </div>
          </div>
        </div>
        <div className="description">
          <p className="mainTitle">Our Life Basket Program</p>
          <div className="textContainer">
            <p className="text">
              In 2018 we launched our Life Basket Program, where an expecting mother 
              can register on our website to start receiving a “Life Baskets”, which 
              will provide tailored information and gifts for each trimester. Contents 
              of these baskets include:<br></br> <br></br>
            </p>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Personalized trimester booklet with advice on nutrition, exercise and resources, including motherhood-prep classes, local community help lines, councilors, therapists and group support .</p>
            </div>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Complementary folic acid & multivitamin supplements.</p>
            </div>
            <div className="listItems">
              <span className="bulletPoint">&#10061;</span>
              <p>Comfort accessories, including back pillows, massagers, journals, and more!</p>
            </div>
          </div>
          <Link to="/program" className="buttonUnderline">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default LifeBasketProgram;
