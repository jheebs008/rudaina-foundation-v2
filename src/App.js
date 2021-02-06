import './sass/main.scss';
import "./App.scss";

import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';
import HomePage from './pages/HomePage/HomePage.component';
import SignIn from './pages/SignIn/SignIn.component';
import SignUp from './pages/SignUp/SignUp.component';
import AboutPage from './pages/AboutPage/AboutPage.component';
import ProgramPage from './pages/ProgramPage/ProgramPage.component';


import React, { Component } from 'react';
import { setCurrentUser } from './redux/user/user.actions';

import { app } from './firebase';
import firebase from "firebase";
import { connect } from 'react-redux';
import UserPage from './pages/UserPage/UserPage.component';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResourcesPage from './pages/ResourcesPage/ResourcesPage.component';
import VolunteerPage from './pages/VolunteerPage/VolunteerPage.component';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.component';

class App extends Component {
  state = {
    user : {},
  }
  //unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser,  } = this.props;

    // this.unsubscribeFromAuth = app.auth().onAuthStateChanged((user) => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user state changed", user);
      if(user){
        firebase.database().ref(`benefactors/${user.uid}`).on('value' , (data)=>{
          if(data.toJSON()){
            console.log("user info fetched", data.toJSON());
            setCurrentUser(data.toJSON());
          }else{
            firebase.database().ref(`volunteers/${user.uid}`).on('value' , (data)=>{
              if(data.toJSON()){
                console.log("user info fetched", data.toJSON());
                setCurrentUser(data.toJSON());
              }
            })
          }
        })
      }else{
        setCurrentUser(null);
      }
    })

    window.onscroll = () => {
      if(window.pageYOffset === 0) {
        alert('I AM AT THE TOP');
      }
    };
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    window.onscroll = null;
  }

  render() {
    const {currentUser} = this.props
    return (
      <div className="app">
        <ToastContainer/>
        <Header />
        <div className="app__content">
          <Switch className="app__contet">
            <Route exact path='/' component={HomePage} />
            <Route exact path='/volunteer' component={VolunteerPage} />
            <Route exact path='/resources' component={ResourcesPage}  />
            <Route exact path='/sign-in'
              render={() => currentUser ? <Redirect to='/' /> : <SignIn />}
            />
            <Route exact path='/sign-up'
              render={() => currentUser ? <Redirect to='/' /> : <SignUp />}
            />
            <Route exact path='/dashboard'
              render={() => !currentUser ? <Redirect to='/' /> : <UserPage />}
            />
            <Route exact path='/forgot-password'
            render={() => currentUser ? <Redirect to='/' /> : <ForgotPassword />}
            />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/program' component={ProgramPage} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user : {currentUser : currentUser}}) => ({
  currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
