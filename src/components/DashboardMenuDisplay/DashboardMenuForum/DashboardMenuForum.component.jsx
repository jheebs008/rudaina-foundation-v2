import React, { useState, useEffect, useRef } from 'react';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./DashboardMenuForum.styles.scss"
import { connect } from 'react-redux'
import firebase from "firebase";
import { groups } from '../../../assets/utilities';
import ChatItem from './ChatItem/ChatItem.component';
import ChatInputBox from '../../ChatInputBox/ChatInputBox.component';

var uniqid = require('uniqid');

const DashboardMenuForum = ({currentUser}) => {
  const [textArea, setTextArea] = useState({
    value: '',
    rows: 1,
    minRows: 1,
    maxRows: 3,
  })

  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState("rudaina");

  const updateSelectedChat = (group) => {
    setSelectedChat(group);
    updateMessages(group);
  }

  //const messagesEndRef = useRef(null)

  const getMessages = (group) => {
    console.log("fetching messages for " + group)
    firebase.database().ref(`chat/${group}`).on('value' , (data)=>{
      if(data.toJSON()){
        let messageCount =0;
        let array1 = Object.values(data.toJSON());
        let array2 = [];

        // array1.forEach((arr)=>{
        //     arr[6] = messageCount;
        //     array2.push(arr);
        //     messageCount++;
        // });
        return array1;
        //messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        console.log("here are the messages ", array1)
        //return array1;
      }
      else {
        return []
      }
    })
  }

  const fetchMessages = (group) => {
    console.log("item Message " + group)
    let result = []
    firebase.database().ref(`chat/${group}`).on('value', (data) => {
      console.log("item Message FIREBASE", data)
      if (data.toJSON()) {
        const result = Object.values(data.toJSON());
        console.log("here are the item message ", result)
        
      }
      else {
        //setMessages([])
        console.log("here are the item message NONE")
        result = [];
      }
    })
    return result
  }

  const updateMessages = (group) => {
    console.log("fetching messages for " + group)
    firebase.database().ref(`chat/${group}`).on('value' , (data)=>{
      if(data.toJSON()){
        let messageCount =0;
        let array1 = Object.values(data.toJSON());
        let array2 = [];

        // array1.forEach((arr)=>{
        //     arr[6] = messageCount;
        //     array2.push(arr);
        //     messageCount++;
        // });
        setMessages(array1);
        //messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        console.log("here are the messages ", array1)
        return array1;
      }
      else {
        setMessages([])
        return [];
      }
    })
  }

  useEffect(() => {
    updateMessages("rudaina");
  }, []);

  const postMessage = (e) => {
    e.preventDefault();
    const { firstName, lastName, uid } = currentUser;
    console.log("sent by : ", firstName, lastName, uid, new Date().toString().split(" ").slice(0, 4).join(' '));
    const messageId = uniqid();
    let messageIndex = 0;

    firebase.database().ref(`chat/${selectedChat}/${messageId}`).set({
      message : textArea.value,
      sender : `${firstName} ${lastName} `,
      date :new Date().toString().split(" ").slice(0, 4).join(' '),
      messageIndex : messageIndex ,
      messageId : messageId,
      senderUid: uid,
      
    }).then(() => {
      setTextArea({...textArea, value: ""})
      firebase.database().ref(`chat/${selectedChat}`).on('value' , (data)=>{
        if(data.toJSON()){
            console.log("well looks like it worked")
            messageIndex++;
        }
        else{
          // this.setState({
          //     messages : [],
          //     replyingTo : null,
          //     replyingToIndex : null,
          //     messageToReply : []
          // })
          console.log("well looks like it did not worked")
          messageIndex++;
        }
      })
  }).catch((error)=>{
      console.log(error)
      // this.setState({
      //   messages : [],
      //   replyingTo : null,
      //   replyingToIndex : null,
      //   messageToReply : []
      // })
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

  const ROOT_CSS = css({
    height: "100%",
    width: "100%"
  });
  
  return (
    <div className="dashboardMenuForum">
      <div className="messageBox">
        <div className="messagesContainer">
          <ScrollToBottom className={ ROOT_CSS }>
            {
              messages.map(({date, id, message, messageIndex, sender, senderUid}) => 
                <div key={id} className={`messageBubbleContainer ${(senderUid === currentUser.uid) && "myMessage"}`}>
                  <div className="myMessageBubble">
                    <p className="senderName">{sender}</p>
                    <p className="text">{message}</p>
                    <div className="dateContainer">
                      <p className="date">{date}</p>
                    </div>
                  </div>
                </div>
              )
            }
            {/*<div ref={messagesEndRef} />*/}
          </ScrollToBottom>
        </div>
        <ChatInputBox
          rows={textArea.rows}
          value={textArea.value}
          placeholder={'Enter your text here...'}
          onChange={handleChange}
          postMessage={postMessage}
        />
      </div>
      <div className="peopleBox">
        <div className="selectedUserDetails">
          <div className="selectedChatUser">
            <div className="selectedChatThumbnail">
              <img src="./img/pregnant-woman.jpeg" alt="" />
            </div>
            <p className="header">{selectedChat.charAt(0).toUpperCase() + selectedChat.slice(1)}</p>
          </div>
        </div>
        <div className="userBox">
          {
            groups.map(({name,imagePath}) =>
              <div key={name} className="user" onClick={() => updateSelectedChat(name.toLowerCase())}>
                <img src={imagePath} alt="" />
                <div className="userDetails">
                  <span className="name">{name}</span>
                  <span className="latestMessage">Hey! Welcome to the group ...</span>
                </div>
                <span className="unreadMessagesCount">3</span>
              </div>
            )
          }
          {/*{
            groups.map(({name,imagePath}) =>
              <ChatItem key={name} name={name} fetchMessages={fetchMessages}  onClick={() => updateSelectedChat(name.toLowerCase())}/>
            )
          }*/}
        </div>
        {/**/}
      </div>
    </div>
  );
}

const mapStateToProps = ({user : currentUser}) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps, null)(DashboardMenuForum);
