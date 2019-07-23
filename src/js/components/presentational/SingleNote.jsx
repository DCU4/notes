import React, { Component } from "react";

export default class SingleNote extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.state = {
      class: "",
      apiResponse: "",
      style: {
        opacity: 0,
        transform: 'translateX(105px)',
        transition: 'all .25s ease-in',
      }
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

  editNote = e => {
    // e.preventDefault();
    let id = this.props.id;

    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    let url = "https://dc-notes.herokuapp.com/" + id + "/?_method=PUT";
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

  // //add classes in componentWillMount, remove in unmount
  // addClasses (){
  //   setTimeout(() => {
  //     this.setState({ class:'slide-in'})
  //   }, 100)
  // }

  // removeClasses() {
  //   setTimeout(() => {
  //     this.setState({ class:'slide-out'})
  //   }, 100)
  // }


  componentWillReceiveProps(newProps) { // check for the mounted props
    if(!newProps.singleNote){
      return this.unMountStyle() }// call outro animation when mounted prop is false
    this.setState({ // remount the node when the mounted prop is true
      singleNote: true
    })
    setTimeout(this.mountStyle, 10) // call the into animation
  }

  unMountStyle() { // css for unmount animation
    this.setState({
      style: {
        opacity: 0,
        transform: 'translateX(-15px)',
        transition: 'all 1s ease',
      }
    })
  }

  mountStyle() { // css for mount animation
    console.log('mount single note');
    this.setState({
      style: {
        opacity: 1,
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

  componentWillMount() {
    this._isMounted = true;
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
      return null; //You can change here to put a customized loading spinner
    }
    // console.log(note.notes);
    let day = new Date(note.notes.created).getDate();
    let month = new Date(note.notes.created).getMonth();
    let year = new Date(note.notes.created).getFullYear();
    return (
      this.props.singleNote &&
      <ul style={this.state.style} className={`single-note ${this.state.class}`} onTransitionEnd={this.transitionEnd}>
        <li className="date">{month}-{day}-{year}</li>
        <form id="editNote" onSubmit={oldNote !== "" ? this.editNote : null}>
          <textarea defaultValue={(note.notes.note.split(/\r?\n/))} onChange={this.props.onChange}/>
        </form>
      </ul>
    );
  }
}
