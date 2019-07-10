import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let note = this.state.apiResponse;
    let singleNote = this.props.singleNote;
    let addNoteState = this.props.addNoteState;
    // if (!this.props || note.notes == undefined) {
    //   return null; //You can change here to put a customized loading spinner
    // }
    // console.log(note.notes);
    // console.log(this.props);
    return (
      <nav>

          {singleNote ? (
            <ul>
              {!addNoteState ? (
                <li onClick={this.props.onClick}>All Notes</li>
              ) : (
                <form>
                  <button onClick={this.props.onClick} form="addNote">Testing</button>
                </form>
              )}

            </ul>
          ) : (
            <ul>
              <li>Folders</li>
              <li onClick={this.props.addNote}>Add</li>
            </ul>

          )}


      </nav>
    );
  }
}
