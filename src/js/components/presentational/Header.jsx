import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);

  }
  //
  onScroll = (e) => {
    let header = document.querySelector('header');
    let st = window.pageYOffset || document.documentElement.scrollTop;
    console.log(window.pageYOffset, document.documentElement.scrollTop);
    // let bounding = window.getBoundingClientRect();

    // console.log(st);
    //if you scroll up or down more than 100px from anywhere on the screen, then show or hide
    if (st > 100){
      header.classList.add('scroll');

    } else {
      header.classList.remove('scroll');
    }
  }

  componentDidMount() {

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  render() {
    let singleNote = this.props.singleNote;
    let addNoteState = this.props.addNoteState;
    let noteState = this.props.note;

    return (
      <header >
        <nav>

        {singleNote ? (
          <ul>
            {!addNoteState ? (
              <form >
                {noteState!== "" ? <button form="editNote">All Notes</button> : <p onClick={this.props.onClick}>All Notes</p>}
              </form>
            ) : (
              <form>
                <button form="addNote">All Notes</button>
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
      </header>

    );
  }
}
