import React from 'react';
import "./DashboardMenus.styles.scss";
import DashboardMenuitem from '../DashboardMenuitem/DashboardMenuitem.component';
import { app } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardMenus = ({history, currentUser}) => {
  let usersFirstName = null;
  let usersLastName = null;
  let usersImageUrl = "";
  const privilage = currentUser.role.toLowerCase();
  if (currentUser) {
    usersFirstName = currentUser.firstName
    usersLastName = currentUser.lastName
    usersImageUrl = currentUser.profilePic ? currentUser.profilePic : ""
  }
  
  const handleLogout = () => {
    app.auth().signOut().then(()=>{
      console.log("Sign Out successful");
      history.push("/");
    })
  }

  return (
    <div className="dashboardMenusContainer">
      <div>
        <div className="imageContainer">
          {usersImageUrl ? 
            <img src={usersImageUrl} alt="" /> :
            <div className="thumbnail">
              <p className="text">{`${usersFirstName[0]}${usersLastName[0]}`}</p>
            </div>
          }
          {/* <img src="./img/pregnant-woman.jpeg"/> */}
        </div>
        {(privilage === "volunteer" || privilage === "benefactor") &&
          <>
            <DashboardMenuitem name="Profile" icon="far fa-address-card" />
            <DashboardMenuitem name="My Task" icon="fas fa-tasks" />
            <DashboardMenuitem name="Events" icon="far fa-calendar-alt" />
            {/*<DashboardMenuitem name="Settings" icon="fas fa-user-cog" />*/}
          </>
        }
        {(privilage === "benefactor") &&
          <>
            <DashboardMenuitem name="Forum" icon="far fa-comment-alt" />
          </>
        }
        {(privilage === "admin") &&
          <>
            <DashboardMenuitem name="Manage Events" icon="far fa-calendar-plus"/>
            <DashboardMenuitem name="Manage Users" icon="fas fa-users" />
            <DashboardMenuitem name="Manage News" icon="far fa-newspaper"/>
          </>
        }
      </div>
      <DashboardMenuitem name="Sign Out" icon="fas fa-door-open" onClick={handleLogout} style={{ borderBottom: "0px solid transparent" }} signOut={true}/>
    </div>
  );
}



// export default withRouter(DashboardMenus);

const mapStateToProps = ({user : currentUser}) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps)(withRouter(DashboardMenus));
