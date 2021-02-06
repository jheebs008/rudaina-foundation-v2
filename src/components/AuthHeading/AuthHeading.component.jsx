import React from 'react';
import "./AuthHeading.styles.scss"

const AuthHeading = ({title, subTitle}) => {
  return (
    <div className='AuthHeadings'>
      <h2 className='AuthHeading'>{title}</h2>
      <p className='AuthSubHeading'>{subTitle}</p>
    </div> 
  );
}

export default AuthHeading;
