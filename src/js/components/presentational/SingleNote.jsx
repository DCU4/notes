import React, { Component } from "react";

export default class SingleNote extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      class: "",
      apiResponse: ""
    };
  }

  getSingleNote() {
    let id = this.props.id;

    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    let url = "https://dc-notes.herokuapp.com/" + id;
    fetch(url)
		.then(res => res.json())
		.then(
			res => {
				if (this._isMounted) {
					this.setState({ apiResponse: res });
				}
			}
		);
  }

  editNote () {

    let url = "https://dc-notes.herokuapp.com/" + id + "/?_method=PUT";
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
  }

  componentWillMount() {
    this._isMounted = true;
    this.getSingleNote();
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.getSingleNote();
  }

  render() {
    let note = this.state.apiResponse;
    if (!this.props || note.notes == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    // console.log(note.notes);
    let day = new Date(note.notes.created).getDate();
    let month = new Date(note.notes.created).getMonth();
    let year = new Date(note.notes.created).getFullYear();
    return (
      <ul className="single-note">
        <li className="date">{month}-{day}-{year}</li>
        {/* <li> {(note.notes.note.split(/\r?\n/))}</li> */}
        <form id="editNote" onSubmit={this.editNote}>
          <textarea defaultValue={(note.notes.note.split(/\r?\n/))}/>
          <button></button>
        </form>

      </ul>
    );
  }
}
