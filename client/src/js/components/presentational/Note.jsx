import React, { Component } from 'react';


export default class Note extends Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    let note = this.props.note;
    
    if(!this.props || this.props.note == undefined){
      return null; //You can change here to put a customized loading spinner
    }
    console.log(note); 

    return (
        <ul>
        {
          // note.map((item, index) => <li key={index}>{item}</li>)
        }
      </ul>
    );
  }
}