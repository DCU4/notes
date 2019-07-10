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
    // console.log(this.props);
    return (
      <ul className="single-note">

        <li> {note.notes.note}</li>
      </ul>
    );
  }
}
