import React from 'react';
import "./News.styles.scss";

const News = ({ title, author, imageUrl, description, createdAtDate, eventId, externalLink, setSelectedNews, selectedNews }) => {
  return (
    <div className="News">
      <div className={`${(selectedNews === eventId) ? "OverlayVisible" : "OverlayHidden"}`}>
        <h3 className="NewsTitle">{title}</h3>
        <p className="Description">{description}</p>
        <div className="Footer">
          <p><span className="Bold">Author : </span>{author}</p>
          <p><span className="Bold">Date Posted : </span>{createdAtDate}</p>
        </div>
        <div className="Link">
          <p onClick={()=>setSelectedNews(false)}  className="Close">Close</p>
          <a href={externalLink} target="__blank" className="Link">More Info</a>
        </div>
      </div>
      <div className="Image">
        <img alt="" src={imageUrl} />
      </div>
      <div className="Details">
        <div>
          <h3 className="NewsTitle">{title}</h3>
          <p>By, {author}</p>
        </div>
        <div className="Footer">
          <p onClick={()=>setSelectedNews(eventId)} className="Link">More Info</p>
          {/* <a onClick={()=>setSelectedNews(eventId)} href="http://www.google.com" target="__blank" className="Link">More Info</a> */}
        </div>
      </div>
    </div>
  );
};

export default News;
