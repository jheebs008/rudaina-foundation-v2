import React from 'react';
import "./ChatItem.styles.scss";

const ChatItem =  ({ name, onClick, imagePath, messages,  fetchMessages, }) => {
  const chatItemMessage = fetchMessages(name.toLowerCase())
  console.log("messages for CHATITEM ",name, chatItemMessage)
  //{messages.slice(-1).pop().message}
  return (
    <div className="user" onClick={onClick}>
      <img src={imagePath} alt="" />
      <div className="userDetails">
        <span className="name">{name}</span>
        <span className="latestMessage">hello</span>
      </div>
      <span className="unreadMessagesCount">3</span>
    </div>
  );
}

export default ChatItem;
