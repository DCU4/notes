import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let note = this.state.apiResponse;
    let state = this.props.singleNote;
    // if (!this.props || note.notes == undefined) {
    //   return null; //You can change here to put a customized loading spinner
    // }
    // console.log(note.notes);
    console.log(this.props);
    return (
      <nav>
        
          {state ? (
            <ul>
              <li onClick={this.props.onClick}>All Notes</li>
            </ul>
          ) : (
            <ul>
              <li>Folders</li>
              <li>Add</li>
            </ul>
            
          )}
          
        
      </nav>
    );
  }
}
