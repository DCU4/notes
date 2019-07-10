import React, { Component } from "react";
import Form from "../presentational/Form.jsx";

export default class SingleNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      class: "",
      apiResponse: "",
      note: "",
      items: [],
    };
  }

  saveNote() {
    let url = "https://dc-notes.herokuapp.com/note";
    let data = "note=" + this.state.note;
    // let data = {note:this.state.note}
    // console.log(this.state.note);
    fetch(url, {
      method: "POST",
      body: data,
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
    // console.log(this.state.apiResponse);
  }

  writeNote = e => {
    e.preventDefault();
    this.setState({
      note: "",
      items: [...this.state.items, this.state.note]
    });
    this.saveNote();
  };

  onChange = event => {
    this.setState({ note: event.target.value });
  };


  render() {

    return (
      <ul className="single-note">

        <Form
          writeNote={this.writeNote}
          saveNote={this.saveNote}
          note={this.state.note}
          class={this.state.class}
          onChange={this.onChange}
        />
      </ul>
    );
  }
}
