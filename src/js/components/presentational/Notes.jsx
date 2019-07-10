import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let note = this.props.note;
    let className = this.props.class;
    // console.log(className);
    let id = this.props.id;
    let date = this.props.date;
    let d = new Date(date).toDateString()
    let truncate = (input) => input.length > 15 ? `${input.substring(0, 10)}...` : input;

    if (!this.props || this.props.note == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    return (
      <li id={id} className={"note "+className} onClick={this.props.onClick}>
        <span className="date">{d}</span>
        <span >{truncate(note)}</span>
      </li>
    );
  }
}
