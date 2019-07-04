import React, { Component } from 'react';


export default class Note extends Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    let note = this.props.note;
    console.log(this.props); 
    if(!this.props || this.props.note == undefined){
      return null; //You can change here to put a customized loading spinner
    }
    
    return (
      <ul>
        <li> {note} </li>
        <li>test</li>
        {this.props.items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    );
  }
}