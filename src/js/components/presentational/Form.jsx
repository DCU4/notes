import React, { Component } from 'react';


export default class Form extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <form className={this.props.class} onSubmit={this.props.writeNote}>
        {/* <input value={this.props.note} onChange={this.props.onChange}  /> */}
        <textarea value={this.props.note} onChange={this.props.onChange}></textarea>
        <button>Write</button>
      </form>
    );
  }
}