import React from 'react'
import "./ChatInputBox.styles.scss";

const ChatInputBox = ({rows, value, placeholder, onChange, postMessage}) => {
  return (
    <div className="textAreaBox">
      <div className="textArea">
        <textarea
          rows={rows}
          value={value}
          placeholder={'Please be nice and respectful...'}
          className={'textarea'}
          onChange={onChange}
        />
        <button onClick={postMessage}>
          <i class="far fa-paper-plane"></i>
        </button>
        
      </div>
    </div>
  )
}

export default ChatInputBox
