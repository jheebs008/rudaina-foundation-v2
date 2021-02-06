import React from 'react';
import "./EventItem.styles.scss";

const EventItem = ({ title, startDate, endDate, description, eventId, category, deleteEvent, showJoinButton, showDeleteButton, styles, showCloseButton, closeModal, handleEventJoining, attendees, descriptionLimit, hideFooter }) => {
  let numberOfAttendees = 0;
  let eventAttendees = null;
  if (attendees) {
    eventAttendees = Object.values(attendees)
    numberOfAttendees = eventAttendees.length;
    console.log("NUMBER OF ATTENDEES", Object.values(attendees));
  }
  if (descriptionLimit) {
    description = description.split(" ").splice(0, descriptionLimit).join(" ")
  }

  const createImagethumbnails = () => {
    let thumbnails = [];
    for (let i = 0; i < 3; i++){
      thumbnails.push(
        <div className={`img ${"img" + i}`}>
          {(eventAttendees && eventAttendees[i] )?
            <>
              {eventAttendees[i].imageUrl?
                <img src={eventAttendees[i].imageUrl} alt="" /> :
                <p>{`${eventAttendees[i].firstName[0]} ${eventAttendees[i].lastName[0]}`}</p>
              }
            </> : 
            <i className="fas fa-user"></i>
          }
        </div>
      )
    }
    return thumbnails;
  }

  return (
    <div style={styles} className="event">
      {showCloseButton && <div className="closeButton" onClick={closeModal}>
        <i className="far fa-times-circle"></i>
      </div>}
      <p className="title">{title}</p>
      <p className="subText">{`${startDate} - ${endDate}`}</p>
      <p className="description">{description}</p>
      {!hideFooter && <div className="eventFooter">
        {hideFooter && <p className="subText">{`Number of people attending : ${numberOfAttendees}.`}</p>}
        <div className="attendees">
          {hideFooter && <div className="attendeesDetails">
            <div className="attendeesThumbnails">
              {createImagethumbnails()}
            </div>
            <p className="showButton">SHOW</p>
          </div>}
          <div className="eventActions">
            {showDeleteButton && <div className="action" onClick={deleteEvent}>
              <i class="fas fa-trash-alt"></i>
              <p>Delete</p>
            </div>}
            { showJoinButton && <div className="action" onClick={handleEventJoining}>
              <i class="fas fa-file-signature"></i>
              <p>Join</p>
            </div>}
          </div>
        </div>
      </div>}
      <div>
        
      </div>
    </div>
  );
}

export default EventItem;
