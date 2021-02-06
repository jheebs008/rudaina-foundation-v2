import React, {useState, useEffect} from 'react';
import "./ManageEvents.styles.scss"
import FormInput from '../../FormInput/FormInput.components';
import TextAreaInput from '../../TextAreaInput/TextAreaInput.component';
import AuthButton from '../../AuthButton/AuthButton.component';
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import SelectInput from '../../SelectInput/SelectInput.component';
import firebase from "firebase";
import EventItem from './EventItem/EventItem.component';
import Select from 'react-select';
import {  toast } from 'react-toastify';
import BlankView from '../../BlankView/BlankView.component';

var uniqid = require('uniqid');

const eventOptions = [
  { label: 'Benefactor Events', value: 'benefactor' },
  { label: 'Volunteer Events', value: 'volunteer' },
];

const ManageEvents = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: 'benefactor',
    createdAtDate: new Date().toString().split(" ").slice(0, 4).join(' '),
  });

  const [events, setEvents] = useState({ benefactorEvents: [], volunteerEvents: [] });
  const [benefactorEvents, setBenefactorEvents] = useState([]);
  const [volunteerEvents, setVolunteerEvents] = useState([]);

  // const [selectedEventOption.label, setSelectedEventOption] = useState("benefactor")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [error, setError] = useState("")

  const [selectedEventOption, setSelectedEventOption] = useState(eventOptions[0]);

  const [modalStatus, setModalStatus] = useState(false);
  const [deleteEventResponse, setDeleteEventResponse] = useState("none");
  const [eventItemToDeleteInfo, setEventItemToDeleteInfo] = useState(null)

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    firebase.database().ref('events/benefactor').on('value' , (data)=>{
      if(data.toJSON()){
        console.log("benefactor events", Object.values(data.toJSON()))
        setBenefactorEvents(Object.values(data.toJSON()))
      }
      else{
        setBenefactorEvents([])
      }
    })

    firebase.database().ref('events/volunteer').on('value' , (data)=>{
      if(data.toJSON()){
        console.log("volunteer events", Object.values(data.toJSON()))
        setVolunteerEvents(Object.values(data.toJSON()))
      }
      else{
        setVolunteerEvents([])
      }
    })
  }

  const handleChange = event => {
    const { value, name } = event.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const addEvent = event => {
    event.preventDefault();
    setLoadingEvents(true);
    //const { title, description, startDate, endDate, category, } = eventDetails;
    const eventId = uniqid();

    firebase.database().ref(`events/${eventDetails.category}/${eventId}`).set({
      ...eventDetails,
      eventId : eventId,
      numberOfAttendees: 0,
    }).then(()=>{
      setLoadingEvents(false);
      fetchEvents();
      setEventDetails({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        category: '',
      });
      toast.success(`${eventDetails.category} event created successful`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }
      );
      // firebase.database().ref('events/benefactors').on('value' , (data)=>{
      //   if(data.toJSON()){
      //       console.log("well looks like it worked")
      //       this.setState({
      //           benefactorsEvents : Object.values(data.toJSON())
      //       })
      //   }
      //   else{
      //       benefactorsEvents : []
      //   }
      // })
    }).catch((error)=>{
      console.log(error)
      setLoadingEvents(false);
      toast.error(`There was a problem creating This Event`, {
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

  const deleteEvent = (category, eventId, response = null) => {
    setModalStatus(true)
    console.log("eventItemToDeleteInfo", !eventItemToDeleteInfo)
    if (!eventItemToDeleteInfo) {
      setEventItemToDeleteInfo([category, eventId])
      return;
    }

    if (response === false) {
      setEventItemToDeleteInfo(null);
      setModalStatus(false);
      return
    }

    if (response === true) {
      firebase.database().ref(`events/${category}`).child(eventId + '').remove().then(() => {
        setEventItemToDeleteInfo(null);
        setModalStatus(false)
        toast.success(`Event deleted successfully`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }
        );
      });
      return
    }
  }

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
  color : #FF0243;
  `;

  console.log("benefactorEvents", benefactorEvents);

  return (
    <div className="manageEvents">
      <div className="addEvent">
        <p className="title">Create a new event</p>
        <form className="addEventForm" onSubmit={addEvent}>
          <FormInput
            type="text" 
            name="title" 
            value={eventDetails.title}
            onChange={handleChange}
            label="Title"
            required={true}
          />
          <TextAreaInput 
            type = "text" 
            name="description" 
            value={eventDetails.description} 
            onChange={handleChange} 
            required = {true}
            label="About this event"
          />
          <FormInput
            type="date" 
            name="startDate" 
            value={eventDetails.startDate}
            onChange={handleChange}
            label="Start date"
            required={true}
          />
          <FormInput
            type="date" 
            name="endDate" 
            value={eventDetails.endDate}
            onChange={handleChange}
            label="End date"
            required={true}
          />
          <div style={{marginTop: "1rem"}}>
            <SelectInput
              name="category"
              value={eventDetails.category}
              onChange={handleChange}
              required={true}
              label="Category"
            >
              <option value="benefactor">Benefactor</option>
              <option value="volunteer">Volunteer</option>
            </SelectInput>
          </div>
          <div className="buttonContainer">
            <AuthButton isLoading={isLoading} buttonText="Add" />
          </div>
        </form>
      </div>
      <div className="viewEvents">
        {modalStatus && <div className="modal">
          <div className="box">
            <h3 className="title">Attention</h3>
            <p className="text">This is a permanent change, Are you sure you want to delete this event?</p>
            <div className="buttons">
              <p onClick = {() => deleteEvent(eventItemToDeleteInfo[0], eventItemToDeleteInfo[1], true)} className="yes">Yes</p>
              <p onClick = {() => deleteEvent(eventItemToDeleteInfo[0], eventItemToDeleteInfo[1], false)} className="no">No</p>
            </div>
          </div>
        </div>}
        <div className="eventsOptions">
          <Select
            defaultValue={selectedEventOption}
            onChange={(data) => {
              setSelectedEventOption(data)
            }}
            options={eventOptions}
            className="selectDropdown"
          />
        </div>
        <div className="eventsContainer">
          {loadingEvents ?
            <div className="loadingEvents">
              <HashLoader
                css={override}
                size={30}
                color={"#FF0243"}
                loading={loadingEvents}
              />
            </div> :
            <div className="events">
              {false? 
                <BlankView iconClassName="fas fa-users" text={`There are no events in this category`} />:
                <>
                {selectedEventOption.value === "benefactor" &&
                  benefactorEvents.map(
                    ({ title, startDate, endDate, description, eventId, numberOfAttendees, category, attendees }) => {
                      return <EventItem 
                        title={title} 
                        startDate={startDate} 
                        endDate={endDate} 
                        description={description} 
                        eventId={eventId} 
                        numberOfAttendees={numberOfAttendees} 
                        category={category} 
                        deleteEvent={()=>deleteEvent(category, eventId)}
                        showJoinButton = {false}
                        showDeleteButton = {true}
                        attendees = {attendees}
                        hideFooter={false}
                      />}
                  )
                }
                {selectedEventOption.value === "volunteer" &&
                  volunteerEvents.map(
                    ({ title, startDate, endDate, description, eventId, numberOfAttendees, category, attendees }) =>
                      <EventItem 
                        title={title} 
                        startDate={startDate} 
                        endDate={endDate} 
                        description={description} 
                        eventId={eventId} 
                        numberOfAttendees={numberOfAttendees} 
                        category={category} 
                        deleteEvent={()=>deleteEvent(category, eventId)}
                        showJoinButton = {false}
                        showDeleteButton = {true}
                        attendees = {attendees}
                        hideFooter={false}
                      />
                  )
                }
              </>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ManageEvents;
