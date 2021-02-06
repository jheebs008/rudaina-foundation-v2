import React from 'react';
import "./UserPage.styles.scss"
import DashboardMenus from '../../components/DashboardMenus/DashboardMenus.component';
import DashboardMenuDisplay from '../../components/DashboardMenuDisplay/DashboardMenuDisplay.component';

const UserPage = () => {
  return (
    <div className="userPageContainer">
      <DashboardMenus/>
      <DashboardMenuDisplay/>
    </div>
  );
}

export default UserPage;
