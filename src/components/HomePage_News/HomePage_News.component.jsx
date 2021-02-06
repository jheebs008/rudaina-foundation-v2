import React, {useState, useEffect} from 'react';
import "./HomePage_News.styles.scss";
import firebase from "firebase";
import News from '../News/News.component';

const HomePage_News = () => {
  const [charityNews, setCharityNews] = useState(false);
  const [pregnancyNews, setPregnancyNews] = useState(false);
  const [relevantNews, setRelevantNews] = useState(false);
  const [selectedNews, setSelectedNews] =  useState(false);
  // const homepageNews = [charityNews.slice(-1).pop(), pregnancyNews.slice(-1).pop(), relevantNews.slice(-1).pop(),]
  // console.log("homepageNews", homepageNews)
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
  console.log("homepageNews HEREE", charityNews, pregnancyNews, relevantNews)
  return (
    <div className="HomePage_NewsContainer">
      <div>
        <h1 className="Title">See what we're up to</h1>
        {(charityNews && pregnancyNews && relevantNews) && <div className="NewsContainer">
          {[charityNews.slice(-1).pop(), pregnancyNews.slice(-1).pop(), relevantNews.slice(-1).pop()].map(({ title, author, imageUrl, description, createdAtDate, eventId, externalLink }) => 
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

export default HomePage_News;
