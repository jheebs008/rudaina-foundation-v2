import React from 'react';
import "./Sponsors.style.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sponsor = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="sponsorsContainer">
      <div className="sponsors">
        <h1 className="bigThanksText">A <span className="bold">BIG</span> thanks to our Supporters!</h1>
        <div>
          <Slider {...settings}>
            {/* <a target="_blank" href="https://www.greenenergystandards.ca/">
              <div className="sponsorImage">
                <img src="/img/egs.png"/>
              </div>
            </a> */}
            <a target="_blank" href="https://tcccanada.com/">
              <div className="sponsorImage">
                <img src="/img/tcc.png"/>
              </div>
            </a>
            <a target="_blank" href="https://liveworkplay.ca/">
              <div className="sponsorImage">
                <img src="/img/kw.png"/>
              </div>
            </a>
            <a target="_blank" href="https://www.canada.ca/en/employment-social-development/services/funding/canada-summer-jobs.html">
              <div className="sponsorImage">
                <img src="/img/CCSJ2018.png"/>
              </div>
            </a>
            <a target="_blank" href="https://www.canada.ca/en/employment-social-development/services/funding/canada-summer-jobs.html">
              <div className="sponsorImage">
                <img src="/img/csj19.jpg"/>
              </div>
            </a>
            <a target="_blank" href="https://www.canada.ca/en/employment-social-development/services/funding/canada-summer-jobs.html">
              <div className="sponsorImage">
                <img src="/img/csj2020.png"/>
              </div>
            </a>
            {/* <a target="_blank" href="http://www.wiseottawa.ca/">
              <div className="sponsorImage">
                <img src="/img/wise ifse.png"/>
              </div>
            </a> */}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Sponsor
