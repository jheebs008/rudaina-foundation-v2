import React, { useState, useEffect } from 'react';
import News from '../../components/News/News.component';
import "./ResourcesPage.styles.scss";
import firebase from "firebase";

const ResourcesPage = () => {
  const [charityNews, setCharityNews] = useState(false);
  const [pregnancyNews, setPregnancyNews] = useState(false);
  const [relevantNews, setRelevantNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState(false);
  
  useEffect(() => {
    console.log("Homepage will mount")
    fetchNews();
  }, []);

  const fetchNews = () => {
    firebase.database().ref('news/relevant').on('value' , (data)=>{
        console.log("I am fetching relevant news", Object.values(data.toJSON()) )
        if(data.toJSON()){
          setRelevantNews(Object.values(data.toJSON()) )
        }
    })

    firebase.database().ref('news/pregnancy').on('value' , (data)=>{
        if(data.toJSON()){
          setPregnancyNews(Object.values(data.toJSON()))
        }
    })

    firebase.database().ref('news/charity').on('value' , (data)=>{
        if(data.toJSON()){
          setCharityNews( Object.values(data.toJSON()))
        }
    })
  }

  return (
    <div className=" HomePage_NewsContainer ResourcePageContainer">
      <div className="Section">
        <h1 className="Title">Relevant News</h1>
        {(charityNews && pregnancyNews && relevantNews) && <div className="NewsContainer">
          {relevantNews.map(({ title, author, imageUrl, description, createdAtDate, eventId, externalLink }) => 
          <News 
            key={eventId} 
            eventId={eventId}
            title={title}  
            author={author}
            imageUrl={imageUrl}
            description={description}
            createdAtDate ={createdAtDate}
            externalLink={externalLink}
            selectedNews= {selectedNews}
            setSelectedNews= {setSelectedNews}
          />
          )}
        </div>}
      </div>
      <div className="Section">
        <h1 className="Title">Pregnancy News</h1>
        {(charityNews && pregnancyNews && relevantNews) && <div className="NewsContainer">
          {pregnancyNews.map(({ title, author, imageUrl, description, createdAtDate, eventId, externalLink }) => 
          <News 
            key={eventId} 
            eventId={eventId}
            title={title}  
            author={author}
            imageUrl={imageUrl}
            description={description}
            createdAtDate ={createdAtDate}
            externalLink={externalLink}
            selectedNews= {selectedNews}
            setSelectedNews= {setSelectedNews}
          />
          )}
        </div>}
      </div>
      <div className="Section">
        <h1 className="Title">Charity News</h1>
        {(charityNews && pregnancyNews && relevantNews) && <div className="NewsContainer">
          {charityNews.map(({ title, author, imageUrl, description, createdAtDate, eventId, externalLink }) => 
          <News 
            key={eventId} 
            eventId={eventId}
            title={title}  
            author={author}
            imageUrl={imageUrl}
            description={description}
            createdAtDate ={createdAtDate}
            externalLink={externalLink}
            selectedNews= {selectedNews}
            setSelectedNews= {setSelectedNews}
          />
          )}
        </div>}
      </div>
    </div>
  );
};

export default ResourcesPage;
