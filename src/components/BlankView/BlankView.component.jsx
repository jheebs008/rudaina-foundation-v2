import React from 'react';
import "./BlankView.styles.scss";

const BlankView = ({iconClassName,text}) => {
  return (
    <div className="nothingToShow">
      <i class={`${iconClassName}`}></i>
      <p>{text}</p>
    </div>
  );
};

export default BlankView;
