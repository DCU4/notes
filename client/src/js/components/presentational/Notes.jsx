import React, { Component } from 'react';


export default class Notes extends Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    let note = this.props.note;
    let id = this.props.id
    // console.log(this.props); 
    if(!this.props || this.props.note == undefined){
      return null; //You can change here to put a customized loading spinner
    }
    
    return (
      // <ul>
      // <a onClick={this.getSingleNote} href={"/"+id}>
        <li onClick={this.props.onClick}> {note} </li>
        // </a>

        // {this.props.items.map((item, index) => <li key={index}>{item}</li>)}
      // </ul>
    );
  }
}