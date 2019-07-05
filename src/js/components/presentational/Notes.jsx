import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let note = this.props.note;
    let id = this.props.id;
    let date = this.props.date;
    let d = new Date(date).toDateString()
    let truncate = (input) => input.length > 15 ? `${input.substring(0, 15)}...` : input;

    // console.log(date);
    if (!this.props || this.props.note == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    return (
      <li className="note" onClick={this.props.onClick}>
        <span className="date">{d}</span>
        <span id={id}>{truncate(note)}</span>
      </li>
    );
  }
}
