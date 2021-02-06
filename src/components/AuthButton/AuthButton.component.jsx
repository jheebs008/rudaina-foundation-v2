import React from 'react';
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import "./AuthButton.styles.scss"

const AuthButton = ({ isLoading, buttonText, forProfilePage }) => {
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
  color : red;
  `;

  return (
    <button className="animatedButtonContainer" type="submit" >
      <div className={`buttonPressEffect ${true ? "profilePageButton" : "animatedButton"}`}>
        {isLoading ?
          <HashLoader
            css={override}
            size={30}
            color={"#FFF"}
            loading={isLoading}
          /> :
          <i className="fas fa-check"></i>
        }
        <p className="title">{buttonText}</p>
      </div>
    </button>
  );
}

export default AuthButton
