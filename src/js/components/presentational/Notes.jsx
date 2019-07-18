import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
  }

  deleteNote = del => {

    let id = this.props.id;
    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    let url = "https://dc-notes.herokuapp.com/" + id + "/?_method=DELETE";
    fetch(url, {
      method: "POST",
      mode: "no-cors", // no-cors, cors, *same-origin
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => res.json())
    .catch(function(error) {
      console.error("Error:", error);
    });
    this.props.getNotes;
  }



  render() {
    let note = this.props.note;
    let className = this.props.class;
    // console.log(className);
    let id = this.props.id;
    let date = this.props.date;
    let d = new Date(date).toDateString();
    let truncate = (input) => input.length > 15 ? `${input.substring(0, 10)}...` : input;
    // let delay = (input) =>

    if (!this.props || this.props.note == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    return (
      <li className={"note "+className}>
        <p id={id}  onClick={this.props.onClick} >
          <span className="date">{d}</span>
          <span >{truncate(note)}</span>
        </p>
      <span onClick={this.deleteNote}>DELETE</span>
      </li>

    );
  }
}
