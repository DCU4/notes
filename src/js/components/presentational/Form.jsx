import React, { Component } from 'react';


export default class Form extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <form id="addNote" className={this.props.class} onSubmit={this.props.writeNote}>
        <textarea value={this.props.note} onChange={this.props.onChange}></textarea>
      </form>
    );
  }
}