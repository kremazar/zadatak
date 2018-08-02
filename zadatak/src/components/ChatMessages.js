import React, { Component} from 'react'
import '../styles/ChatMessages.css'
import ChatMessage from './ChatMessage'

class ChatMessages extends Component {
	
  render() {
   
    return (
      <div className='ChatMessages'>
        {this.props.messages.map((message, i) => {
          return (<ChatMessage
            key={i}
            message={message.text} 
            username={message.sentBy.name}
            time={message.createdAt}
			messages={this.props.messages}
          />)
        })}
        <div style={ {float:"left", clear: "both"} }
             ref={el => { this.props.endRef(el) }}></div>
      </div>
    )
  }

}

export default ChatMessages
