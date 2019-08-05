import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      class: "",
    }
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
    }).then(this.setState({
      delete: !this.state.delete ? true : false
    }));

  }

  onSubmit = (e) => {
    this.deleteNote();
    this.props.getNotes();
  }

  onTouchMove = e => {
    //if the right is over 50% showing than add this

    let sL = e.currentTarget.scrollLeft;
    // console.log( sL) ;

    // if n.x > 375, add class to change the right
    // if (sL ==188){
    //   // this.setState({ class: "delete-reveal" })
    //   e.currentTarget.scrollLeft = 0;
    // } else {
    //   e.currentTarget.scrollLeft = 188;
    // }
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
        !this.state.delete &&
        <li className={this.state.class+" note "} onTouchMove={this.onTouchMove} onTransitionEnd={this.transitionEnd}>
          <p id={id}  onClick={this.props.onClick} >
            <span className="date">{d}</span>
            <span >{truncate(note)}</span>
          </p>
          <form onSubmit={this.onSubmit}>
            <button>X</button>
          </form>
        </li>

      )


  }
}
