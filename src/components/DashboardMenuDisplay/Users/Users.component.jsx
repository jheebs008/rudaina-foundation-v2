import React, {useState, useEffect} from 'react';
import "./Users.styles.scss";
import firebase from "firebase";
import Select from 'react-select';
import BlankView from '../../BlankView/BlankView.component';
import { ShowToast } from '../../../assets/utilities';

const uniqid = require('uniqid');

const options = [
  { value: 'Benefactors', label: 'Benefactors' },
  { value: 'Volunteers', label: 'Volunteers' },
  { value: 'Subscribers', label: 'Subscribers' },
];

const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending', label: 'Pending' },
];


const Users = () => {
  // const [selectedOption.value, setSelectedOption] = useState("Benefactors");
  const [benefactorUsers, setBenefactorUsers] = useState([]);
  const [volunteerUsers, setVolunteerUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]); 
  const [userDetailsToView, setUserDetailsToView] = useState(null);

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedStatusOption, setSelectedStatusOption] = useState(statusOptions[0]);
  const [filterUsers, setFilterUsers] =  useState("")

  // const handleOptionChange = selectedOption.value => {
  //   this.setState(
  //     { selectedOption.value },
  //     () => console.log(`Option selected:`, this.state.selectedOption.value)
  //   );
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    firebase.database().ref('benefactors').on('value' , (data)=>{
      if(data.toJSON()){
        setBenefactorUsers(Object.values(data.toJSON()))
      }
      else{
        setBenefactorUsers([])
      }
    })

    firebase.database().ref('volunteers').on('value' , (data)=>{
      if(data.toJSON()){
        setVolunteerUsers(Object.values(data.toJSON()))
      }
      else{
        setVolunteerUsers([])
      }
    })

    firebase.database().ref('subscribers').on('value' , (data)=>{
      if(data.toJSON()){
        setSubscribers(Object.values(data.toJSON()))
      }
      else{
        setSubscribers([])
      }
    })
  }

  const getUsersList = () => {
    let selectedUsers = null;
    switch (selectedOption.value) {
      case "Benefactors":
        selectedUsers = benefactorUsers
        break;
      case "Volunteers":
        selectedUsers = volunteerUsers
        break;
      
      case "Subscribers":
        selectedUsers = subscribers
        break;
    
      default:
        break;
    }
    console.log("selectedUsers", selectedUsers)
    let result = [...selectedUsers]
    
    console.log(" FILTER stats", filterUsers)
    if (filterUsers) {
        result = selectedUsers.filter(user => {
          if (!user.firstName) { 
            console.log("no FN", user.email.toLowerCase().split("@")[0], filterUsers, (user.email.toLowerCase()).includes(filterUsers))
            return (user.email.toLowerCase().split("@")[0]).includes(filterUsers)
          } else {
            return (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(filterUsers)
          }
        })
    }

    if(selectedStatusOption.label !== "All" && selectedOption.label !== "Subscribers" ){
      result = selectedUsers.filter(user => user.status === selectedStatusOption.label.toLowerCase())
    }
    return (
      result.map((userDetails, index) => {
        let { firstName, lastName, status, uid, id, email } = userDetails;
        console.log("VIEW", firstName, lastName, status, uid, id, email)
        let listStyle = "user"
        if (userDetailsToView) {
          if (selectedOption.label === "Subscribers") {
            listStyle = userDetailsToView.id === id ? "user selectedUser" : "user"
          } else {
            listStyle = userDetailsToView.uid === uid ? "user selectedUser" : "user"
          }
        }
        // console.log("DETAILS", userDetails)
        return (
            <div className={listStyle} key={selectedOption.label !== "Subscribers" ? uid : id} onClick={() => setUserDetailsToView(userDetails)}>
              <p>{index + 1} .</p>
              <p>{selectedOption.value === "Subscribers" ? `${email}` : `${firstName} ${lastName}`}</p>
              <p>{status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}</p>
            </div>
        )
      }
      )
    )
  }

  const approveAccount = (userCurrentStatus) => {
    const status = userCurrentStatus === "pending" ? "approved" : "pending"
    firebase.database().ref(`${userDetailsToView.role + "s"}/${userDetailsToView.uid}`).update({
      status
    }).then(() => {
      const newUserDetailsToView = {...userDetailsToView};
      newUserDetailsToView["status"] = status;
      console.log("Status updated succes", status, benefactorUsers)
      setUserDetailsToView(newUserDetailsToView)
      const notificationId = uniqid()
      sendNotification(notificationId, status)
    }).catch((error) => {
      console.log("could not update statsu")
    })
  }

  const sendNotification = (notificationId, status) => {
    const message = (status ===  "approved") ? "Hello! you account has been approved . Your can now use the site with no limitations. Thank you": "Hello, your account approval was denied. Please reach us at rudainafoundation@gmail.com. thank you"
    firebase.database().ref(`${userDetailsToView.role+"s"}/${userDetailsToView.uid}/notifications/${notificationId}`).set({
      notificationId,
      title: "Account status change",
      text: message,
      notificationDate: new Date().toString().split(" ").slice(0, 4).join(' '),
    }).then(()=>{
      console.log("Successfully added event to user");
      ShowToast("success", `A notification has been sent to this user`)
    }).catch((error) => {
      console.log(error)
      ShowToast("error", `Sorry we could not send a notification to the user. Please Try again later`)
    })
  }


  return (
    <div className="usersContainer">
      <div className="categories">
        {/* <div className="options">
          <p 
            className={`option ${(selectedOption.value === "Benefactors") && "activeOption"}`} 
            onClick={() => setSelectedOption("Benefactors")}
          >Benefactors</p>
          <p 
            className={`option ${(selectedOption.value === "Volunteers") && "activeOption"}`} 
            onClick={() => setSelectedOption("Volunteers")}
          >Volunteers</p>
          <p 
            className={`option ${(selectedOption.value === "Subscribers") && "activeOption"}`} 
            onClick={() => setSelectedOption("Subscribers")}
          >Subscribers</p>
        </div> */}
        <div className="__header">
          <input
            name="filterUsers"
            type="text"
            value={filterUsers}
            onChange={(e) => setFilterUsers(e.target.value)}
            placeholder="Search for a user ..."
            className="filterSearch"
          />
          {selectedOption.label !== "Subscribers" && <Select
            defaultValue={selectedStatusOption}
            onChange={setSelectedStatusOption}
            options={statusOptions}
            className="selectDropdown"
          />}
          <Select
            defaultValue={selectedOption}
            onChange={(data) => {
              setUserDetailsToView(null)
              setSelectedOption(data)
            }}
            options={options}
            className="selectDropdown"
          />
        </div>
        <div className="users">
          <div className="user userHeader">
            <p></p>
            <p>{selectedOption.value === "Subscribers" ? `Email` : `Full Name`}</p>
            <p>{selectedOption.value === "Subscribers" ? `` : `Status`}</p>
          </div>
          {getUsersList().length ?
            <div className="userListScroll">
              {getUsersList()}
            </div> : 
            <BlankView iconClassName="fas fa-users" text={`There are no ${selectedOption.label}`} />
          }
        </div>
      </div>
      <div className="details">
        {userDetailsToView ?
          <div>
            <p className="detail"><span className="label">Email </span> {userDetailsToView.email}</p> 
            <p className="detail"><span className="label">Sign Up Date </span> {userDetailsToView.signUpDate}</p>

            {
              (selectedOption.label === "Benefactors" || selectedOption.label === "Volunteers" ) && 
              <>
                <p className="detail"><span className="label">First Name </span> {userDetailsToView.firstName}</p> 
                <p className="detail"><span className="label">Last Name </span> {userDetailsToView.lastName}</p> 
                <p className="detail"><span className="label">Phone Number </span> {userDetailsToView.phoneNumber}</p> 
                <p className="detail"><span className="label">Date Of Birth </span> {userDetailsToView.dateOfBirth}</p> 
                <p className="detail"><span className="label">Home Address </span> {userDetailsToView.homeAddress}</p> 
                <p className="detail"><span className="label">Apt / Unit </span> {userDetailsToView.apartmentUnit}</p> 
                <p className="detail"><span className="label">Postal Code </span> {userDetailsToView.postalCode}</p> 
                <p className="detail"><span className="label">City </span> {userDetailsToView.city}</p> 
                <p className="detail"><span className="label">Province </span> {userDetailsToView.province}</p> 

                {(selectedOption.label === "Volunteers") && 
                  <>
                    <p className="detail"><span className="label">How I Can Help </span>  {userDetailsToView.help}</p> 
                    <p className="detail"><span className="label">Why I Want To Volunteer </span>  {userDetailsToView.volunteerReason}</p> 
                  </>
                }

                {         
                  (selectedOption.label === "Benefactors") && 
                  <>
                    <p className="detail"><span className="label">Currently a full time student  </span>  {userDetailsToView.fullTimeStudent}</p> 
                    <p className="detail"><span className="label">Attending full-time school during/after pregnancy</span> {userDetailsToView.attendSchool}</p> 
                    <p className="detail"><span className="label">Relationship Status </span>  {userDetailsToView.relationshipStatus}</p> 
                    <p className="detail"><span className="label">Status in Canada</span> {userDetailsToView.statusInCanada}</p> 
                    <p className="detail"><span className="label">Days of exercise per week </span>  {userDetailsToView.daysOfExercise}</p> 
                    <p className="detail"><span className="label">Smoker</span> {userDetailsToView.smoker}</p> 
                    <p className="detail"><span className="label">Source of income </span>  {userDetailsToView.sourceOfIncome}</p> 
                    <p className="detail"><span className="label">How many sources of household income</span> {userDetailsToView.sourcesOfHouseholdIncome}</p> 
                    <p className="detail"><span className="label">Veteran status </span>  {userDetailsToView.veteranStatus}</p> 
                    <p className="detail"><span className="label">Indigenous status</span> {userDetailsToView.indigenousStatus}</p> 
                    <p className="detail"><span className="label">Identify as a visible minority </span>  {userDetailsToView.visibleMinority}</p> 
                    <p className="detail"><span className="label">Physical | mental disability</span> {userDetailsToView.disabled}</p> 

                    <p className="detail"><span className="label">Weeks Of Gestation </span>  {userDetailsToView.gestationWeeks}</p> 
                    <p className="detail"><span className="label">Dietary restrictions</span> {userDetailsToView.dietRestrictions}</p> 
                    <div className="detail">
                      <p className="label">Baskets Recieved</p>
                      <div className="baskets">
                        <div className={userDetailsToView.trimesterOnebasket ? "basket receivedBasket" : "basket"}>
                          <i className="fas fa-shopping-basket"></i>
                          <p className="basketLabel">Trimester 1</p>
                        </div>
                        <div className={userDetailsToView.trimesterTwobasket ? "basket receivedBasket" : "basket"}>
                          <i className="fas fa-shopping-basket"></i>
                          <p className="basketLabel">Trimester 2</p>
                        </div>
                        <div className={userDetailsToView.trimesterThreebasket ? "basket receivedBasket" : "basket"}>
                          <i className="fas fa-shopping-basket"></i>
                          <p className="basketLabel">Trimester 3</p>
                        </div>
                      </div>
                    </div>
                  </>
                }
                <div className="decisionButtonContainer">
                  {userDetailsToView.status == "pending" && 
                    <p onClick={() => approveAccount(userDetailsToView.status)} className="decisionButton">Approve This User</p>
                  }
                  {userDetailsToView.status == "approved" && 
                    <p onClick={() => approveAccount(userDetailsToView.status)} className="decisionButtonDisapprove">Disapprove This User</p>
                  }
                </div>
              </>
            }
          </div>:
          <BlankView iconClassName="far fa-file-alt" text="Select A User To View" />
        }
      </div>
    </div>
  );
}

export default Users;
