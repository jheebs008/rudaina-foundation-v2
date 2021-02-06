import React, { useState, useEffect } from 'react';
import "./ProfilePage.styles.scss";
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import Settings from '../Settings/Settings.component';
import firebase from "firebase";

const ProfilePage = ({currentUser}) => {
  const [selectedMenu, setSelectedMenu] = useState("Settings")

  const fullName = currentUser.firstName + " " + currentUser.lastName;
  const role = currentUser.role[0].toUpperCase() + currentUser.role.slice(1,currentUser.role.length)

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    firebase.database().ref(`${currentUser.role.toLowerCase()+"s"}/${currentUser.uid}/notifications`).on('value' , (data)=>{
      if(data.toJSON()){
        console.log("This users notifications", Object.values(data.toJSON()))
        setNotifications(Object.values(data.toJSON()))
      }
      else{
        setNotifications([])
      }
    })
  }

  return (
    <div className="profilePage">

      <div className="main">
        <div className="profile">
          <div className="Header">
            <div className="ImageProfile">
              {currentUser.profilePic ?
                <img alt="" src={currentUser.profilePic} /> :
                <div className="thumbnail">
                  <p className="text">{`${currentUser.firstName[0]}${currentUser.lastName[0]}`}</p>
                </div>
              }
            </div>
            <div className="NameContainer">
              <h2>{fullName}</h2>
              <h4 className="Role">{role }</h4>
            </div>
          </div>
          <div className="about">
            <div>
              <i className="fas fa-quote-left quote-top"></i>
            </div>
            {currentUser.bio ?
              <p>{currentUser.bio}</p> :
              <p>{`Hello , my name is ${fullName}. I am a ${role} at Rudaina foundation. I'm yet to update my bio , but trust me i'm really cool !`}</p>
            }
            <div className="quote-bottom">
              <i class="fas fa-quote-right "></i>
            </div>
          </div>
          <div className="SocialLinks">
            <div className="Links">
              <a href={`tel:${currentUser.phoneNumber}`}>
                <i class="fas fa-phone-square"></i>
              </a>
              <a href={`mailto:${currentUser.email}?Subject=Hello,%20Dear`} >
                <i class="fas fa-at email"></i>
              </a>
              {currentUser.twitterUsername && <a target="__blank" href={`https://www.twitter.com/${currentUser.twitterUsername}/`}>
                <i class="fab fa-twitter-square twitter"></i>
              </a>}
              {currentUser.instagramUsername && <a target="__blank" href={`https://www.instagram.com/${currentUser.instagramUsername}/`}>
                <i class="fab fa-instagram instagram"></i>
              </a>}
              {currentUser.facebookUsername && <a target="__blank" href={`https://www.facebook.com/${currentUser.facebookUsername}/`}>
              <i class="fab fa-facebook-square facebook"></i>
              </a>}
            </div>
          </div>
          <div className="MenusContainer">
            <div className="Menus">
              <h3 onClick={() => setSelectedMenu("Settings")} className={`Menu ${selectedMenu === "Settings" && "MenuActive"}`}>
                <i class="fas fa-user-cog"></i>
                Settings
              </h3>
              <h3 onClick={() => setSelectedMenu("Images")} className={`Menu ${selectedMenu === "Images" && "MenuActive"}`}>
                <i class="far fa-images"></i>
                Images
              </h3>
            </div>
          </div>
          <div className="OptionDisplay">
            {selectedMenu === "Settings" && <Settings/>}
            {selectedMenu === "Images" && "Images"}
          </div>
        </div>
      </div>

      <div className="sub">
        {(currentUser.role === "benefactor") ?
          <div className="contactCard">
            <h2>Aslam Yehia</h2>
            <p>Your advisors contact</p>
            <div className="contact">
              <div className="iconContainer">
                <a href="tel:+1-613-294-0275">
                  <i class="fas fa-phone"></i>
                </a>
                <p>Make a call</p>
              </div>
              <div className="iconContainer">
                <a href="mailto:Aslam.yehia@hotmail.com?Subject=Hello,%20Rudaina%20user" target="_top">
                  <i class="fas fa-envelope-open-text"></i>
                </a>
                <p>Send An Email</p>
              </div>
            </div>
          </div> :
          <div></div>
        }
        <div className="notificationBox">
          <div className="title">
            <p>Notifications</p>
          </div>
          <div className="content">
            {notifications.map(({notificationDate, text, title}) => 
              <div className="notification">
                <div className="notificationHeading">
                  <div className="iconContainer">
                    <i class="fas fa-laugh-beam"></i>
                  </div>
                  <p className="name">{title}</p>
                </div>
                <div>
                  <p>{text}</p>
                </div>
                <div className="notificationFooter">
                  <p>{notificationDate}</p>
                </div>
              </div>
            )}
            <div className="notification">
              <div className="notificationHeading">
                <div className="iconContainer">
                  <i class="fas fa-laugh-beam"></i>
                </div>
                <p className="name">Welcome to Rudaina !</p>
              </div>
              <div>
                <p>
                  Hello!, welcome to rudaina. We are so glad and happy to have you part of this community. Your account is pending at the moment , the apporoval process takes 2-3 days. Please be patient , thank you !.
                </p>
              </div>
              <div className="notificationFooter">
                <p>{currentUser.signUpDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({user : currentUser}) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps)(withRouter(ProfilePage));
