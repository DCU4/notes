import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Nav from "../presentational/Nav.jsx";
import Form from "../presentational/Form.jsx";
import Notes from "../presentational/Notes.jsx";
import NewNote from "../presentational/NewNote.jsx";
import SingleNote from "../presentational/SingleNote.jsx";
import Header from "../presentational/Header.jsx";



class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "",
      note: "",
      items: [],
      apiResponse: "",
      singleNote: false,
      id: ""
    };
    this.addClasses = this.addClasses.bind(this);
  }

  getNotes() {
    let url = "https://dc-notes.herokuapp.com/";
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res})
      // (this.addClasses())
    );
    // this.addClasses();
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

  onClick = open => {
    let singleNote = this.state.singleNote;
    let state = singleNote ? false : true;
    this.setState({
      singleNote: state,
      id: open.target.id
    });
  };

  addClasses (){
    console.log('functuinal called')
    let api = this.state.apiResponse;
    console.log(api);
    if (!this.props || api.notes == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    // api.notes.map((n,i) =>
      // console.log(n),
      // setTimeout(() =>
        this.setState({ class: "all-notes-reveal" })
    // )

  }

  componentWillMount() {
    this.getNotes();
    // this.addClasses();
    // this.addClasses();
    // setTimeout(this.addClasses(), i * 5)
    // setTimeout(this.addClasses(), i * 5)
    console.log('mounted')
  }

  componentDidMount() {
    window.addEventListener('load',this.addClasses);
  }

  render() {
    let api = this.state.apiResponse;
    let singleNote = this.state.singleNote;
    if (!this.props || api.notes == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    return (
      <main>
        <header>
          <Header
            singleNote={singleNote}
            onClick={this.onClick}
          />
        </header>

        <Form
          writeNote={this.writeNote}
          saveNote={this.saveNote}
          note={this.state.note}
          class={this.state.class}
          onChange={this.onChange}
        />

        {!singleNote ? (
          <ul className="all-notes">
            <NewNote items={this.state.items} />
            {api.notes.map((n, i) => {
              // let date = n.created.toDateString();
              // setTimeout(this.addClasses(), i * 5)
              // console.log(n);
              return (
                <Notes
                  note={n.note}
                  date={n.created}
                  key={i}
                  id={n._id}
                  onClick={this.onClick}
                  add={this.addClasses}
                  class={this.state.class}

                />
              );
            })}
          </ul>
        ) : (
          <SingleNote  id={this.state.id} />
        )}
      </main>
    );
  }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
