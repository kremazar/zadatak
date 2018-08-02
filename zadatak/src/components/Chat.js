import React, { Component } from 'react'
import '../styles/Chat.css'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import Count from './Count'
import { graphql, gql, compose } from 'react-apollo'

const newMessageSubscription = gql`
  subscription {
    Message(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        text
        createdAt
        sentBy {
          id
          name
        }
      }
    }
  }
`

class Chat extends Component {

  state = {
    message: '',
  }

  componentDidMount() {
    this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore({
      document: newMessageSubscription,
      updateQuery: (previousState, {subscriptionData}) => {
        const newMessage = subscriptionData.data.Message.node
        const messages = previousState.allMessages.concat([newMessage])
        return {
          allMessages: messages
        }
      },
      onError: (err) => console.error(err),
    })
  }

  render() {
    return (
      <div className='Chat'>
		<Count
		 messages={this.props.allMessagesQuery.allMessages || []}
          endRef={this._endRef}
        />
        <ChatMessages
          messages={this.props.allMessagesQuery.allMessages || []}
          endRef={this._endRef}
		  
        />
        <ChatInput
          message={this.state.message}
          onTextInput={(message) => this.setState({message})}
          onResetText={() => this.setState({message: ''})}
          onSend={this._onSend}
        />
		
		  
      </div>
    )
  }

  _onSend = () => {
	     this.props.createMessageMutation({
      variables: {
        text: this.state.message,
        sentById: this.props.userId
      }
    })
  }


  /*
   * AUTO SCROLLING
   */

  _endRef = (element) => {
    this.endRef = element
  }

  componentDidUpdate(prevProps) {
    // scroll down with every new message
    if (prevProps.allMessagesQuery.allMessages !== this.props.allMessagesQuery.allMessages && this.endRef) {
      this.endRef.scrollIntoView()
	
    }
  }

}

const allMessages = gql`
  query allMessages {
    allMessages(last: 100) {
      id
      text
      createdAt
      sentBy {
        id
        name
      }
    }
  }
`

const createMessage = gql`
  mutation createMessage($text: String!, $sentById: ID!) {
    createMessage(text: $text, sentById: $sentById) {
      id
      text
      createdAt
      sentBy {
        id
        name
      }
    }
  }
`

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


export default compose(
  graphql(createMessage, {name : 'createMessageMutation'}),
  graphql(allMessages, {name: 'allMessagesQuery'}),
  //graphql(MESSAGE_QUERY, {name : 'messageQueryMutation'}),
  //graphql(DELETE_MESSAGE, {name: 'deleteMessageMutation'})
)(Chat)