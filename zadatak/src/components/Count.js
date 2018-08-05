import React, { Component } from "react";
import "../styles/Count.css";
class Count extends Component {
  render() {
    return (
      <div className="Count">{<p>{this.props.messages.length} Items </p>}</div>
    );
  }
}

export default Count;
