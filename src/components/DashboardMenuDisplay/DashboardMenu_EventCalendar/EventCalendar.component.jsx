import React, {useState, useEffect} from 'react';
import "./EventCalendar.styles.scss";
import {connect} from "react-redux"
import firebase from "firebase";
import Modal from 'react-responsive-modal';
import {  toast } from 'react-toastify';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventItem from '../DashboardMenu_ManageEvents/EventItem/EventItem.component';
import { css } from 'glamor';
import { ShowToast } from '../../../assets/utilities';

const localizer = momentLocalizer(moment);



const EventCalendar = ({currentUser}) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState([]);
  const [modalIsOpen, setIsOpen] =useState(false);
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleModal = () => {
    //event.stopPropagation()
    setIsOpen(!modalIsOpen);
  }

  const fetchEvents = () => {
    firebase.database().ref(`events/${currentUser.role}`).on('value', (data) => {
      if (data.toJSON()) {
        console.log("benefactor events", Object.values(data.toJSON()))
        // Date goes back by 1 day , we code below adds 1 day .
        const result = Object.values(data.toJSON())
          .map(event => (
            { ...event, 
              start: moment(event.startDate, "YYYY-MM-DD").add(0, "days").toDate(), 
              end: moment(event.endDate, "YYYY-MM-DD").add(1, "days").toDate() }
          ))
        console.log("old date", Object.values(data.toJSON()))
        console.log("new date", result)
        setCalendarEvents(result)
      }
      else {
        setCalendarEvents([])
      }
    })
  }

  const handleSelectEvent = (event) => {
    console.log("You selected this event : ", event)
    setSelectEvent(event);
    toggleModal();
  }

  const handleEventJoining = () => {
    if (currentUser.status !== "approved") {
      return ShowToast("error", `Your account is currently pending approval, you cannot join events at this point, sorry.`);
    }
    console.log(`${currentUser.uid} would like to join ${selectEvent.eventId}`);
    firebase.database().ref(`events/${currentUser.role}/${selectEvent.eventId}/attendees/${currentUser.uid}`).set({
        ...currentUser
    }).then(() => {
      console.log("Successfully added user to events")
      firebase.database().ref(`${currentUser.role+"s"}/${currentUser.uid}/myEvents/${selectEvent.eventId}`).set({
          ...selectEvent
      }).then(()=>{
        console.log("Successfully added event to user")
        toggleModal();
        ShowToast("success", `You have joined this event , thank you!`);
      }).catch((error) => {
        console.log(error)
        toggleModal()
        ShowToast("error", `You could not join this event, sorry. Please try again later`);
      })
    }).catch((error) => {
      console.log(error)
      toggleModal()
      toast.error(`You could not join this event, sorry.`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }
        );
    })
  };

  return (
    <div className="calendarContainer">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100"}}
        onSelectEvent={(event) =>handleSelectEvent(event)}
        eventPropGetter={
          (event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: "#FF0243",
              color: 'white',
              borderRadius: ".5rem",
              border: "none"
            };
      
            if (event.isMine){
              newStyle.backgroundColor = "lightgreen"
            }
      
            return {
              className: "",
              style: newStyle
            };
          }
        }
      />
      {modalIsOpen && <div className="modal">
          <EventItem
            title={selectEvent.title} 
            startDate={selectEvent.startDate} 
            endDate={selectEvent.endDate} 
            description={selectEvent.description} 
            eventId={selectEvent.eventId} 
            numberOfAttendees={selectEvent.numberOfAttendees} 
            category={selectEvent.category} 
            showJoinButton={true}
            handleEventJoining = {handleEventJoining}
            showDeleteButton={false}
            showCloseButton
            closeModal={()=>toggleModal(selectEvent.eventId)}
          />
        </div>}
    </div>
  );
}

const mapStateToProps = ({user : currentUser}) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps)(EventCalendar);

