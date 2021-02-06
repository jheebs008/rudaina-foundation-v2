import React, { useState, useEffect } from 'react';
import "./ManageNews.styles.scss";
import SelectInput from '../SelectInput/SelectInput.component';
import AuthButton from '../AuthButton/AuthButton.component';
import TextAreaInput from '../TextAreaInput/TextAreaInput.component';
import FormInput from '../FormInput/FormInput.components';
import firebase from "firebase";
import { toast } from 'react-toastify';
import Select from 'react-select';
import { css } from "@emotion/core";


const uniqid = require('uniqid');

const newsOptions = [
  { label: 'Relevant News', value: 'relevant' },
  { label: 'Charity News', value: 'charity' },
  { label: 'Pregnancy News', value: 'pregnancy' },
];

const ManageNews = () => {
  const [newsDetails, setNewsDetails] = useState({
    title: '',
    description: '',
    externalLink: '',
    image: '',
    author: "",
    category: newsOptions[0].value,
    createdAtDate: new Date().toString().split(" ").slice(0, 4).join(' '),
    eventId : uniqid()
  });
  const [isLoading, setIsLoading] = useState(false)
  const [charityNews, setCharityNews] = useState([]);
  const [pregnancyNews, setPregnancyNews] = useState([]);
  const [relevantNews, setRelevantNews] = useState([]);
  const [selectedNewsOption, setSelectedNewsOption] = useState(newsOptions[0]);
  
  useEffect(() => {
    fetchNews();
  }, []);

  const getSelectedNews = () => {
    console.log("selected news", selectedNewsOption.value);
    if (selectedNewsOption.value === "relevant") {
      return relevantNews
    }
    if (selectedNewsOption.value === "charity") {
      return charityNews
    }
    if (selectedNewsOption.value === "pregnancy") {
      return pregnancyNews
    }
  }

  const handleChange = news => {
    const { value, name } = news.target;
    setNewsDetails({ ...newsDetails, [name]: value });
  };

  console.log("ccharityNews", setCharityNews, "Relevant News", setRelevantNews, "")

  const fetchNews = () => {
    firebase.database().ref('news/relevant').on('value' , (data)=>{
        console.log("I am fetching relevant news")
        if(data.toJSON()){
          setRelevantNews(Object.values(data.toJSON()) )
          // this.setState({
          //     relevantNews : Object.values(data.toJSON()),
          // })
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

  const addNews = e => {
    setIsLoading(true)
    e.preventDefault();
    const newsImage = e.target.elements.image.files[0];

    if(newsImage){
      const uploadTask = firebase.storage().ref(`images/${newsImage.name}`).put(newsImage);
      uploadTask.on("state_changed" ,
          (snapshot)=>{

          } ,
          (error)=>{
            console.log(error);
            setIsLoading(false)
            toast.error(`There was a problem creating This News`, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              }
            );
          } ,
          ()=>{
              firebase.storage().ref('images').child(newsImage.name).getDownloadURL().then((url)=>{
                  console.log(url)
                  handleNewsUpload(url);
              })
          }
      )
    }else{
        handleNewsUpload("");
    }
    console.log("image", newsImage);
  }

  const handleNewsUpload = (imageUrl) => {
    firebase.database().ref(`news/${newsDetails.category}/${newsDetails.eventId}`).set({
      ...newsDetails,
      imageUrl
    }).then(() => {
      setIsLoading(false)
      fetchNews();
      setNewsDetails({
        title: '',
        description: '',
        externalLink: '',
        image: '',
        author: "",
        category: newsOptions[0].value,
        createdAtDate: new Date().toString().split(" ").slice(0, 4).join(' '),
        eventId : uniqid()
      })
      toast.success(`News created successful`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }
      );
    }).catch((error) => {
      setIsLoading(false)
      toast.error(`There was a problem creating This News`, {
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
  }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: green;
    color : #FF0243;
  `;

  return (
    <div className="manageEvents">
      <div className="addEvent">
        <p className="title">Create A News</p>
        <form className="addEventForm" onSubmit={addNews}>
          <FormInput
            type="text" 
            name="title" 
            value={newsDetails.title}
            onChange={handleChange}
            label="Title"
            required={true}
          />
          <FormInput
            type="text" 
            name="author" 
            value={newsDetails.author}
            onChange={handleChange}
            label="Author"
            required={true}
          />
          <TextAreaInput
            type = "text" 
            name="description" 
            value={newsDetails.description} 
            onChange={handleChange} 
            required = {true}
            label="News Description"
          />
          <FormInput  
            type = "text" 
            name="externalLink" 
            value={newsDetails.externalLink} 
            onChange={handleChange} 
            required = {true}
            label="External Link"
          />
          <div className="FileInputContainer">
            <div className="FileInput">
              <div className="Label">
                <div className="uploadButton">
                  <i className="fas fa-upload"></i>
                </div>
                <span className="Text">{newsDetails.image ? "Image Selected" : "Select an image"}</span>
              </div>
              <input 
                type="file"
                name="image" 
                value={newsDetails.image}
                onChange={handleChange}
                required={false}
              />
            </div>
          </div>
          <div style={{marginTop: "1rem"}}>
            <SelectInput
              name="category"
              value={newsDetails.category}
              onChange={handleChange}
              required={true}
              label="Category"
            >
              <option value="charity">Charity</option>
              <option value="relevant">Relevant</option>
              <option value="pregnancy">Pregnancy</option>
            </SelectInput>
          </div>
          <div className="buttonContainer">
            <AuthButton isLoading={isLoading} buttonText="Add" />
          </div>
        </form>
      </div>
      <div className="viewEvents">
        <div className="eventsOptions">
          <Select
            defaultValue={selectedNewsOption}
            onChange={(data) => {
              setSelectedNewsOption(data)
            }}
            options={newsOptions}
            className="selectDropdown"
          />
        </div>
        <div className="eventsContainer">
          {getSelectedNews ?
            <div>
            {getSelectedNews().map(({title, author, createdAtDate, description, imageUrl}) =>
              <div className="newsContainer">
                <div className="NewsImage">
                  <img alt="" src={imageUrl}/>
                </div>
                <div className="Details">
                  <h3 className="Ttile">{title}</h3>
                  <p className="Ttile">{description}</p>
                  <div className="Footer">
                    <p><span className="Bold">Author : </span>{author}</p>
                    <p><span className="Bold">Date Posted : </span>{createdAtDate}</p>
                  </div>
                </div>
              </div>
                )
              }
            </div> : 
            <p>Nothing to see</p>
          }
        </div>
      </div>
    </div>
  );
};
export default ManageNews;
