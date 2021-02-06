import React from 'react';
import "./DashboardMenuitem.styles.scss";
import { connect } from 'react-redux';
import { setSelectedOption } from '../../redux/dashboard/dashboard.actions';

const DashboardMenuitem = ({ name, icon, onClick, style, setOption, signOut, option }) => {
  //console.log("Is this the option", option.option, name, option.option === name, option.option === name )
  return (
    <div className={option.option === name ? "DashboardMenuitem DashboardMenuitemActive" : "DashboardMenuitem"} onClick={signOut ? onClick : ()=>setOption(name)} style={style}>
      <i className={icon}></i>
      <span>{name}</span>
    </div>
  );
}

const mapStateToProps = ({dashboard : option}) => ({
  option,
})

const mapDispatchToProps = dispatch => ({
  setOption: option => dispatch(setSelectedOption(option))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardMenuitem);

