import React, {useState} from 'react'
import './Settings.styles.scss';
import FormInput from '../FormInput/FormInput.components';
import TextAreaInput from '../TextAreaInput/TextAreaInput.component';
import AuthButton from '../AuthButton/AuthButton.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { ShowToast } from '../../assets/utilities';

const Settings = ({currentUser}) => {
  const [userCredentials, setCredentials] = useState({
    password: '',
    reEnterPassword: "",
    oldPassword: "",
    phoneNumber: currentUser.phoneNumber,
    bio: currentUser.bio,
    twitterUsername: currentUser.twitterUsername,
    facebookUsername: currentUser.facebookUsername,
    instagramUsername: currentUser.instagramUsername,
    image: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isBioUpdateLoading, setIsBioUpdateLoading] = useState(false)
  const [isPhoneUpdateLoading, setIsPhoneUpdateLoading] = useState(false)
  const [isPasswordUpdateLoading, setIsPasswordUpdateLoading] = useState(false)
  const [isSocialLinksUpdateLoading, setIsSocialLinksUpdateLoading] = useState(false)
  const [isProfileImageUpdateLoading, setIsProfileImageUpdateLoading] = useState(false)

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const updateProfileImage = e => {
    setIsProfileImageUpdateLoading(true)
    e.preventDefault();
    const newsImage = e.target.elements.image.files[0];

    if(newsImage){
      const uploadTask = firebase.storage().ref(`images/${newsImage.name}`).put(newsImage);
      uploadTask.on("state_changed" ,
          (snapshot)=>{

          } ,
          (error)=>{
            console.log(error);
            setIsProfileImageUpdateLoading(false)
            performUpdate({}, "Profile pic", setIsProfileImageUpdateLoading) 
            // toast.error(`There was a problem creating This News`, {
            //   position: "top-left",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   }
            // );
          } ,
          ()=>{
              firebase.storage().ref('images').child(newsImage.name).getDownloadURL().then((url)=>{
                  console.log(url)
                performUpdate({profilePic : url}, "Profile pic", setIsProfileImageUpdateLoading) 
              })
          }
      )
    }else{
      performUpdate({}, "Profile pic", setIsProfileImageUpdateLoading) 
    }
  }

  const updateBio = (event) => {
    event.preventDefault();
    setIsBioUpdateLoading(true)
    performUpdate({bio : userCredentials.bio}, "bio", setIsBioUpdateLoading) 
  }

  const updatePhone = (event) => {
    event.preventDefault();
    setIsPhoneUpdateLoading(true)
    performUpdate({phoneNumber : userCredentials.phoneNumber}, "Phone Number", setIsPhoneUpdateLoading) 
  }

  const updateSocialLink = (event) => {
    event.preventDefault();
    setIsSocialLinksUpdateLoading(true)
    performUpdate({
      twitterUsername: userCredentials.twitterUsername,
      facebookUsername: userCredentials.facebookUsername,
      instagramUsername: userCredentials.instagramUsername,
    }, "Social Link", setIsSocialLinksUpdateLoading) 
  }

  const updatePassword = (event) => {
    event.preventDefault();
    setIsPasswordUpdateLoading(true)
    if (passwordStrength < 3) { 
      return ShowToast("error", `Please ensure your password is a combination of Uppercase, Lowercase, Numbers and special Characters.`)
    }
    if (userCredentials.reEnterPassword !== userCredentials.password) { 
      return ShowToast("error", `Please ensure you re-entered the correct password.`)
    }

    firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(currentUser.email , userCredentials.oldPassword )).then(()=>{
      console.log("We re-auth")
      firebase.auth().currentUser.updatePassword(userCredentials.password).then(()=>{
        setIsPasswordUpdateLoading(false)
        ShowToast("success", "Your password has been updated")
        setCredentials({...userCredentials, 
          password: '',
          reEnterPassword: "",
          oldPassword: "",
        })
      }).catch((error)=>{
        setIsPasswordUpdateLoading(false)
        ShowToast("error", "There was an issue updating your password. Please try again later")
      })
    }).catch((error)=>{
      setIsPasswordUpdateLoading(false)
      ShowToast("error", "Please ensure your current password is correct.")
    })
  }

  const performUpdate = (updates, updateType, loadingUpdate) => {
    firebase.database().ref(`${currentUser.role.toLowerCase() + "s"}/${currentUser.uid}`).update(updates).then(() => {
      loadingUpdate(false)
      ShowToast("success", `Your ${updateType} have be updated!`)
    }).catch(() => {
      loadingUpdate(false)
      ShowToast("error", `Sorry we could not update your ${updateType}. Try again later`)
    })
  }

  return (
    <div className="Settings">
      <div>
        <div className="titleBox">
          <p className="title">About Me</p>
        </div>
        <form onSubmit={updateBio}>
          <TextAreaInput
            type = "text" 
            name="bio" 
            value={userCredentials.bio} 
            onChange={handleChange} 
            label="About yourself (Bio)"
          />
          <div className="updateButton">
            <AuthButton isLoading={isBioUpdateLoading} buttonText="Update" forProfilePage/>
          </div>
        </form>
      </div>
      <div>
        <div className="titleBox">
          <p className="title">Profil pic</p>
        </div>
        <form onSubmit={updateProfileImage}>
          <div className="FileInputContainer">
            <div className="FileInput">
              <div className="Label">
                <div className="uploadButton">
                  <i className="fas fa-upload"></i>
                </div>
                <span className="Text">{userCredentials.image ? "Image Selected" : "Select an image"}</span>
              </div>
              <input 
                type="file"
                name="image" 
                value={userCredentials.image}
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>
          <div className="updateButton" style={{marginTop: "1rem"}}>
            <AuthButton isLoading={isProfileImageUpdateLoading} buttonText="Update" forProfilePage/>
          </div>
        </form>
      </div>
      <div>
        <div className="titleBox">
          <p className="title">Phone number</p>
        </div>
        <form onSubmit={updatePhone}>
          <FormInput
            type="text" 
            name="phoneNumber" 
            value={userCredentials.phoneNumber}
            onChange={handleChange}
            label="Your phone"
          />
          <div className="updateButton">
            <AuthButton isLoading={isPhoneUpdateLoading} buttonText="Update" forProfilePage/>
          </div>
        </form>
      </div>
      <div>
        <div className="titleBox">
          <p className="title">Update Password</p>
        </div>
        <form onSubmit={updatePassword}>
          <FormInput
            type="password" 
            name="oldPassword" 
            value={userCredentials.oldPassword}
            onChange={handleChange}
            label="Old password"
            required={true}
          />
          <FormInput
            type="password" 
            name="password" 
            value={userCredentials.password}
            onChange={handleChange}
            label="Password"
            showPwStrength
            onChangeScore = {setPasswordStrength}
            required={true}
          />
          <FormInput
            type="password" 
            name="reEnterPassword" 
            value={userCredentials.reEnterPassword}
            passwordValue={userCredentials.password}
            onChange={handleChange}
            label="Re-enter password"
            required={true}
          />
          <div className="updateButton">
            <AuthButton isLoading={isPasswordUpdateLoading} buttonText="Update" forProfilePage/>
          </div>
        </form>
      </div>
      <div>
        <div className="titleBox">
          <p className="title">Social Links</p>
        </div>
        <form onSubmit={updateSocialLink}>
          <FormInput
            type="text" 
            name="twitterUsername" 
            value={userCredentials.twitterUsername}
            onChange={handleChange}
            label="Twitter username"
          />
          <FormInput
            type="text" 
            name="facebookUsername" 
            value={userCredentials.facebookUsername}
            onChange={handleChange}
            label="Facebook username"
          />
          <FormInput
            type="text" 
            name="instagramUsername" 
            value={userCredentials.instagramUsername}
            onChange={handleChange}
            label="Instagram username"
          />
          <div className="updateButton">
            <AuthButton isLoading={isSocialLinksUpdateLoading} buttonText="Update" forProfilePage/>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user: currentUser }) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps)(withRouter(Settings));