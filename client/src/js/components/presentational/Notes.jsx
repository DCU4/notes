import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let note = this.props.note;
    let id = this.props.id;
    // console.log(id);
    if (!this.props || this.props.note == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    return (
      <li id={id} onClick={this.props.onClick}>
        {note}
      </li>
    );
  }
}
