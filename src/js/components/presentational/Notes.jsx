import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
  }

  // delay = del => {
  //   let n = document.querySelectorAll('.note');
  //   console.log(n);

  //   for(let i = 0; i < n.length; i++) {
  //     // let del = i*0.5;
  //     // console.log(del);

  //   }
  // }
  componentDidMount() {
    // window.addEventListener('load',this.props.add);
    // this.delay()

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
      <li id={id} className={"note "+className} onClick={this.props.onClick} >
        <span className="date">{d}</span>
        <span >{truncate(note)}</span>
      </li>
    );
  }
}
