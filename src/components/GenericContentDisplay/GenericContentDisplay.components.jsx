import React from 'react'
import "./GenericContentDisplay.styles.scss";
import { Link } from 'react-router-dom';

const GenericContentDisplay = ({children, image, title}) => {
  return (
    <div className="ContentContainer">
      <div className="ContentBox">
        <img alt="" src={image} />
        <div className="TextBox">
          <h1 className="Title">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export default GenericContentDisplay
