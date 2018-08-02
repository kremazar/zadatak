import React, { Component} from 'react'
import '../styles/ChatMessage.css'
import slika from './slika.jpg'; 
import olovka from './olovka.jpg'; 
import { graphql, gql, compose } from 'react-apollo'
import Chat from './Chat'

class ChatMessage extends Component {
	

  
  render() {
	
	var date= this.props.time.toString();
	var date1 = date.slice(0,10);
	var date2 = date.slice(12,19);
	var total = date1 + ' ' + date2;
	
    return (
		
      <div className='ChatMessage'>
	  <button onClick={this.handleDelete}>X</button>
			<button><img src={olovka} className="olovka" alt="olovka" /></button>
        <div className='MessageHeader'>
			<img src={slika} className="avatar" alt="avatar" />
          <div className='Username'>{this.props.username}</div>
          <div className='Time'>{total}</div>
        </div>
  <div className='Message'>{this.props.message} 
			
		</div>
		
      </div>
    )
  }

handleDelete = async () => {
    await this.props.deleteMessageMutation({variables: {id: this.props.messageQueryMutation.Message.id}})
  
  }
}





export default ChatMessage
