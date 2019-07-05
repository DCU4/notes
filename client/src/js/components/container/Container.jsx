import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Nav from "../presentational/Nav.jsx";
import Form from "../presentational/Form.jsx";
import Notes from "../presentational/Notes.jsx";
import NewNote from "../presentational/NewNote.jsx";
import SingleNote from "../presentational/SingleNote.jsx";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "",
      note: "",
      items: [],
      apiResponse: "",
      singleNote: false
    };
  }

  getNotes() {
    let url = "https://dc-notes.herokuapp.com/";
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }));
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
      // .then(res => this.setState({ apiResponse: res })
      .catch(function(error) {
        console.error("Error:", error);
      });
    // console.log(this.state.apiResponse);
  }

  writeNote = e => {
    e.preventDefault();
    // console.log(e.target.elements.NAME);
    this.setState({
      note: "",
      items: [...this.state.items, this.state.note]
    });
    this.saveNote();
  };

  onChange = event => {
    this.setState({ note: event.target.value });
  };
  onClick = open => {
    let singleNote = this.state.singleNote;
    let state = singleNote ? false : true;
    this.setState({ singleNote: state });
  };

  componentWillMount() {
    this.getNotes();
  }

  render() {
    let api = this.state.apiResponse;
    let singleNote = this.state.singleNote;

    if (!this.props || api.notes == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    // console.log(api)

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

        {/* if you click on one of the Notes, it will render SingleNote 
which will make the api call for that notes id */}

        {!singleNote ? (
          <ul>
            <NewNote
              items={this.state.items}
              // note={n.note}
              // key={i}
            />
            {api.notes.map((n, i) => {
              // console.log(n.note,i);
              return (
                <Notes
                  note={n.note}
                  key={i}
                  id={n._id}
                  onClick={this.onClick}
                />
              );
            })}
          </ul>
        ) : (
          api.notes.map((n, i) => {
            return <SingleNote id={n._id} />;
          })
        )}
      </main>
    );
  }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
