import React, { Component } from 'react'
import '../styles/App.css'
import Chat from './Chat'


const CHAT_USER_NAME_KEY = 'CHAT_USER_NAME'
const CHAT_USER_ID_KEY = 'CHAT_USER_ID'

class App extends Component {

 
  render() {
    const name = localStorage.getItem(CHAT_USER_NAME_KEY)
    const userId = localStorage.getItem(CHAT_USER_ID_KEY)
    return (
      <Chat name={name} userId={userId} />
    )
  }
}




export default App
