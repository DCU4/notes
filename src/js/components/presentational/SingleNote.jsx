import React, { Component } from "react";

export default class SingleNote extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      class: "",
      apiResponse: "",

    };
  }

  getSingleNote() {
    let id = this.props.id;

    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    let url = "https://notes-api-five.vercel.app/" + id;
    // let url = 'https://localhost:8080' + id;
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

  editNote = e => {
    // e.preventDefault();
    let id = this.props.id;

    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    // let url = 'https://localhost:27017' + id + "/?_method=PUT";
    let url = "https://notes-api-five.vercel.app/" + id + "/?_method=PUT";
    let data = "note="+this.props.note;
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
      console.log('edited note');
  }

  componentDidMount() {
    this._isMounted = true;
    let header = document.querySelector('header');
    header.classList.remove('scroll');
    this.getSingleNote();
    // this.addClasses();
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.getSingleNote();
  }

  render() {
    let note = this.state.apiResponse;
    let oldNote = this.props.note;
    if (!this.props || note.notes == undefined) {
      return null;
    }
    // console.log(note.notes);
    let day = new Date(note.notes.created).getDate();
    let month = new Date(note.notes.created).getMonth();
    let year = new Date(note.notes.created).getFullYear();
    return (
      this.props.singleNote &&
      <ul className={`single-note ${this.state.class}`} >
        <li className="date">{month}-{day}-{year}</li>
        <form id="editNote" onSubmit={oldNote !== "" ? this.editNote : null}>
          <textarea defaultValue={(note.notes.note)} onChange={this.props.onChange}/>
        </form>
      </ul>
    );
  }
}
