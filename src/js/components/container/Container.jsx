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

  onChange = (event) => {
    this.setState({note: event.target.value});
  }

  writeNote = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.NAME);
    this.setState({
      note: '',
      items: [...this.state.items, this.state.note]
    });

  }
  callAPI() {
    // let url = "https://47956c8a876449ff83a2f627fa1bd5f2.vfs.cloud9.us-east-1.amazonaws.com/"
    let url = "http://localhost:8080/posts"
    fetch(url)
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }),
        console.log(this.state.apiResponse)
        );
    }

componentWillMount() {
    this.callAPI();
}

  render() {

    return (

      <main>
        <h1>Notes</h1>
        <p>Note:{this.state.apiResponse}</p>
        <Form
          writeNote={this.writeNote}
          note={this.state.note}
          class={this.state.class}
          onChange={this.onChange}
        />
      <Note
        items={this.state.items}
      />
      </main>
    );
  }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
