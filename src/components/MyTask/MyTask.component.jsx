import React, { useState, useEffect } from 'react';
import "./MyTask.styles.scss"
import firebase from "firebase";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
// import { css } from "@emotion/core";
import BlankView from '../BlankView/BlankView.component';
import EventItem from '../DashboardMenuDisplay/DashboardMenu_ManageEvents/EventItem/EventItem.component';
import ChatInputBox from '../ChatInputBox/ChatInputBox.component';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import { ShowToast } from '../../assets/utilities';

var uniqid = require('uniqid');

const eventOptions = [
  { label: 'All Events', value: 'all' },
  { label: 'Upcoming Events', value: 'upcoming' },
  { label: 'Past Events', value: 'past' },
];


const MyTask = ({currentUser}) => {
  const [selectedEventOption, setSelectedEventOption] = useState(eventOptions[0]);
  const [events, setEvents] = useState(null);
  const [eventToView, setEventToView] = useState(null);
  const [eventToViewForum, setEventToViewForum] = useState([]);
  const [textArea, setTextArea] = useState({
    value: '',
    rows: 1,
    minRows: 1,
    maxRows: 3,
  })

  useEffect(() => {
    fetchEvents();
    fetchEventForum()
  }, [eventToView]);

  const fetchEventForum = () => {
    if(eventToView){
      firebase.database().ref(`events/${currentUser.role}/${eventToView.eventId}/forum`).on('value' , (data)=>{
        if(data.toJSON()){
          console.log("well looks like it worked",data.toJSON() )
          setEventToViewForum(Object.values(data.toJSON()));
        }
        else{
          console.log("well looks like it did not worked", data.toJSON())
          setEventToViewForum(Object.values(data.toJSON()));
        }
      })
    }
  }

  const postMessage = (e) => {
    e.preventDefault();
    const { firstName, lastName, uid } = currentUser;
    console.log("sent by : ", firstName, lastName, uid, new Date().toString().split(" ").slice(0, 4).join(' '));
    const messageId = uniqid();
    let messageIndex = 0;

    firebase.database().ref(`events/${currentUser.role}/${eventToView.eventId}/forum/${messageId}`).set({
      message : textArea.value,
      sender : `${firstName} ${lastName} `,
      date :new Date().toString().split(" ").slice(0, 4).join(' '),
      messageIndex : messageIndex ,
      messageId : messageId,
      senderUid: uid,
      eventId: eventToView.eventId
    }).then(() => {
      setTextArea({...textArea, value: ""})
      firebase.database().ref(`events/${currentUser.role}/forum`).on('value' , (data)=>{
        if(data.toJSON()){
          console.log("well looks like it worked")
          fetchEvents();
          messageIndex++;
        }
        else{
          console.log("well looks like it did not worked")
          fetchEvents();
          messageIndex++;
        }
      })
  }).catch((error)=>{
      console.log(error)
    }) 
  }

  const handleChange = (event) => {
		const textareaLineHeight = 24;
		const { minRows, maxRows } = textArea;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
    setTextArea({...textArea,
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };


  const fetchEvents = () => {
    firebase.database().ref(`${currentUser.role.toLowerCase()+"s"}/${currentUser.uid}/myEvents`).on('value' , (data)=>{
      if(data.toJSON()){
        console.log("This users events", Object.values(data.toJSON()))
        setEvents(Object.values(data.toJSON()))
      }
      else{
        setEvents([])
      }
    })
  }

  const removeEvent = (event) => {
    const {eventId, category} = event
    console.log("i will remove this event", eventId)
    firebase.database().ref(`${category+"s"}/${currentUser.uid}/myEvents/${eventId}`).remove()
    .then(()=>{
        firebase.database().ref(`/events/${category+"s"}/${eventId}/attendees/${currentUser.uid}`).remove()
        .then(()=>{
          ShowToast("success", `This even has been deleted`)
          setEventToView(null)
        })
        .catch((err)=>{
            ShowToast("error", `There was an issue removing this event , please try again later`)
        });
    })
    .catch((err)=>{
        ShowToast("error", `There was an issue removing this event , please try again later`)
    });
  }

  console.log("eventToViewForum !!!", eventToViewForum)

  const ROOT_CSS = css({
    height: "100%",
    width: "100%"
  });

  return (
    <div className="MyTask">
      <div className="TaskList">
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
        <div className="DisplayEvents">
          {events ? 
            <div>
              {events.map(
                (event) => {
                  const { title, startDate, endDate, description, eventId, numberOfAttendees, category, attendees } = event;
                  return (
                    <div className={`${(eventToView && (eventToView.eventId === eventId)) ? "MyEvent ActiveEvent" : "MyEvent"}`} key={eventId} onClick={() => setEventToView(event)}>
                      <EventItem
                        title={title} 
                        startDate={startDate} 
                        endDate={endDate} 
                        description={description} 
                        eventId={eventId} 
                        numberOfAttendees={numberOfAttendees} 
                        category={category} 
                        showJoinButton = {false}
                        showDeleteButton = {false}
                        attendees={attendees}
                        hideFooter={true}
                        descriptionLimit = {50}
                      />
                    </div>
                  )
                }
              )}
            </div> :
            <BlankView iconClassName="far fa-file" text={`You have no events, go to the Events tab to join an event.`} />
          }
        </div>
      </div>
      <div className="TaskDetails">
        <div className="eventsContainer">
          {eventToView ? 
            <div className="eventsDetails">
              <div className="eventsDetailsInfo">
                <div className="mainEventInfo">
                  <h3 className="">{eventToView.title}</h3>
                  <div className="">
                    <p>{eventToView.description}</p>
                  </div>
                  <div className="dates">
                    <p><span className="notice">Start Date</span> : {eventToView.startDate}</p>
                    <p><span className="notice">End Date</span> : {eventToView.endDate}</p>
                  </div>
                </div>
                <div className="details">
                  <i onClick={()=>removeEvent(eventToView)} class="fas fa-trash deleteButton"></i>
                  <ScrollToBottom className={ ROOT_CSS }>
                    {eventToViewForum && 
                      eventToViewForum.map(({date, message, sender}) =>
                        <div className="message">
                          <h4 className="sender">{sender}</h4>
                          <div className="messageBox">
                            <p>{message}</p>
                          </div>
                          <div className="footer">
                            <p>{date}</p>
                          </div>
                        </div>
                      )
                    }
                  </ScrollToBottom>
                </div>
              </div>
              <div className="inputField">
                <ChatInputBox
                  rows={textArea.rows}
                  value={textArea.value}
                  placeholder={'Enter your text here...'}
                  onChange={handleChange}
                  postMessage={postMessage}
                />
              </div>
              {/*<EventItem 
                title={eventToView.title} 
                startDate={eventToView.startDate} 
                endDate={eventToView.endDate} 
                description={eventToView.description} 
                eventId={eventToView.eventId} 
                numberOfAttendees={eventToView.numberOfAttendees} 
                category={eventToView.category} 
                showJoinButton = {false}
                showDeleteButton = {false}
                attendees = {eventToView.attendees}
                hideFooter={true}
              />
              <ChatInputBox
                rows={textArea.rows}
                value={textArea.value}
                placeholder={'Enter your text here...'}
                onChange={handleChange}
                postMessage={postMessage}
              />*/}
            </div>
            :
            <BlankView iconClassName="far fa-file" text={`Select an event to view.`} />
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({user : currentUser}) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps)(withRouter(MyTask));
