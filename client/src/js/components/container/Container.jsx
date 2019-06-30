import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Nav from "../presentational/Nav.jsx";
import Form from "../presentational/Form.jsx";
import Note from "../presentational/Note.jsx";


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: '',
      note: '',
      items: [],
      apiResponse: ''
    }
  }


  getNotes() {
    let url = "https://dc-notes.herokuapp.com/"
    fetch(url)
        .then(res => res.json())
        .then(res => this.setState({ apiResponse: res }),
        // console.log(this.state.apiResponse)
        );
    }

  saveNote() {
    let url = "https://dc-notes.herokuapp.com/note";
    let data = "note="+this.state.note;
    console.log(this.state.note);
    fetch(url,{
      method: "POST",
      body: data,
      mode: 'no-cors', // no-cors, cors, *same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
      }
    })
    .then(res => res.json())
    .then(res => this.setState({ apiResponse: res })
    .catch(function(error){console.error('Error:', error)}));
    // console.log(this.state.apiResponse);
    }

    writeNote = (e) => {
      e.preventDefault();
      // console.log(e.target.elements.NAME);
      this.setState({
        note: '',
        items: [...this.state.items, this.state.note]
      });
      this.saveNote();
    }

    onChange = (event) => {
      this.setState({note: event.target.value});
    }
  
componentWillMount() {
    this.getNotes();
}

  render() {
    let api = this.state.apiResponse;
    // console.log(api.notes)
    if(!this.props || api.notes == undefined){
      return null; //You can change here to put a customized loading spinner
    }
    api.notes.forEach(function(n){
      // return n.note;
      console.log(n.note);
    });

    return (

      <main>
        <h1>Notes</h1>

        <Form
          writeNote={this.writeNote}
          saveNote={this.saveNote}
          note={this.state.note}
          class={this.state.class}
          onChange={this.onChange}
        />
      <Note
        note={api.notes}
      />
      </main>
    );
  
  }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
