import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.state = {
      delete: false,
      class: "",
      singleNote:this.props.singleNote,
      style: {
        // opacity: 0,
        transform: 'translateX(-105px)',
        transition: 'all .25s ease-in',
      }
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
    console.log( sL) ;

    // if n.x > 375, add class to change the right
    // if (sL ==188){
    //   // this.setState({ class: "delete-reveal" })
    //   e.currentTarget.scrollLeft = 0;
    // } else {
    //   e.currentTarget.scrollLeft = 188;
    // }
  }

  componentWillReceiveProps(newProps) { // check for the mounted props
    if(!newProps.singleNote)
      return this.unMountStyle() // call outro animation when mounted prop is false
    this.setState({ // remount the node when the mounted prop is true
      singleNote: true
    })
    setTimeout(this.mountStyle, 10) // call the into animation
  }

  unMountStyle() { // css for unmount animation
    this.setState({
      style: {
        // opacity: 0,
        transform: 'translateX(-15px)',
        transition: 'all 1s ease',
      }
    })
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: {
        // opacity: 1,
        transform: 'translateX(0px)',
        transition: 'all .25s ease-in',
      }
    })
  }

  componentDidMount(){
    setTimeout(this.mountStyle, 10) // call the into animation
  }

  transitionEnd(){
    if(!this.props.singleNote){ // remove the node on transition end when the mounted prop is false
      this.setState({
        singleNote: false
      })
    }
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
        !this.state.singleNote &&
        <li style={this.state.style} className={this.state.class+" note "} onTouchMove={this.onTouchMove} onTransitionEnd={this.transitionEnd}>
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
