import React, { Component } from 'react';


export default class NewNote extends Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    let note = this.props.items;
    // console.log(this.props); 
    if(!this.props || note == undefined){
      return null; //You can change here to put a customized loading spinner
    }
    
    return (
      <ul>


        {note.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    );
  }
}