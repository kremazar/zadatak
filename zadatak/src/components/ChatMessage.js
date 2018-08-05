import React, { Component } from "react";
import "../styles/ChatMessage.css";
import slika from "./slika.jpg";
import olovka from "./olovka.jpg";

class ChatMessage extends Component {
  render() {
    var date = this.props.time.toString();
    var date1 = date.slice(0, 10);
    var date2 = date.slice(12, 19);
    var total = date1 + " " + date2;
    return (
      <div className="ChatMessage">
        <button>X</button>
        <button>
          <img src={olovka} className="olovka" alt="olovka" />
        </button>
        <div className="MessageHeader">
          <img src={slika} className="avatar" alt="avatar" />
          <div className="Username">{this.props.username}</div>
          <div className="Time">{total}</div>
        </div>
        <div className="Message">{this.props.message}</div>
      </div>
    );
  }
}

export default ChatMessage;
