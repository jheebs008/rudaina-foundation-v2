import React, { useState, useEffect } from 'react';
import LifeBasketProgram from '../../components/LifeBasketProgram/LifeBasketProgram.component';
import HomePage_News from '../../components/HomePage_News/HomePage_News.component';
import MoreInfo from '../../components/MoreInfo/MoreInfo.components';
import SubHeader from '../../components/SubHeader/SubHeader.component';
import Sponsor from '../../components/Sponsors/Sponsors.component';

const HomePage = () => {
  return (
    <div>
      {/* <SubHeader /> */}
      <SubHeader />
      <MoreInfo /> 
      <LifeBasketProgram />
      <HomePage_News isForHomePage={true} />
      <Sponsor/>
      {/* 
      <LifeBasketProgram/>
      <HomePageNews/>
      <Sponsor/> */}
    </div>
  );
}

export default HomePage;
