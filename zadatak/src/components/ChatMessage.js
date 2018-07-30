import React, { Component} from 'react'
import '../styles/ChatMessage.css'
import slika from './slika.jpg'; 
import { graphql, gql, compose } from 'react-apollo'

class ChatMessage extends Component {

  render() {
	
     var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
	   var hours = new Date().getHours();
	    var minutes = new Date().getMinutes();
		var ago = date + '-' + month + '-' + year + ' ' + hours + ':' + minutes;
		
		
    return (
		
      <div className='ChatMessage'>
        <div className='MessageHeader'>
			<img src={slika} className="avatar" alt="avatar" />
          <div className='Username'>{this.props.username}</div>
          <div className='Time'>({ago})</div>
        </div>
  <div className='Message'>{this.props.message} 
			<button onClick={this.handleDelete}>X</button>
			<button>UPDATE</button>
		</div>
		
      </div>
    )
  }

handleDelete = () => {
	
    this.props.deleteMessageMutation({variables: {id: this.props.messageQueryMutation.Message.id}})
    
  }
}
const MESSAGE_QUERY = gql`
  query MessageQuery($id: ID!) {
    Message(id: $id) {
      id
    	text
    	sentBy{
        name
      }
    }
  }
`
const DELETE_MESSAGE = gql`
mutation DeleteMessage($id:ID!){
  deleteMessage(id:$id){
    id
  }
}
`



//const DetailPageWithGraphQL = compose(
 // graphql(MESSAGE_QUERY, {
 //   name: 'messageQueryMutation',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
   // options: ({match}) => ({
    //  variables: {
     //   id: match.params.id,
   //   },
   // }),
 // }),
 // graphql(DELETE_MESSAGE, {
 //   name: 'deleteMessageMutation'
 // })
//)(ChatMessage)

//const DetailPageWithDelete = graphql(DELETE_MESSAGE)(DetailPageWithGraphQL)

export default (ChatMessage)
