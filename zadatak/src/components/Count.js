import React, { Component } from 'react'
import '../styles/Count.css'
import ChatMessage from './ChatMessage'
import ChatMessages from './ChatMessages'
import Chat from './Chat'
class Count extends Component {


  render() {
 
    return (
	<div className="Count">
	{
		<p>{this.props.messages.length}    Items </p>
	}
	</div>
    )
  }
}




export default Count