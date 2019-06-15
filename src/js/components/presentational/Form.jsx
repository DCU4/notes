import React, { Component } from 'react';


export default class Form extends Component {
  constructor(props) {
    super(props);
  
  }

  render() {

    return (
      <form className={this.props.class} onSubmit={this.props.getWeather}>
        <input className={this.props.error?'error' : ''} type="text" name="city" placeholder="City"/>
        <input className={this.props.error?'error' : ''} type="text" name="country" placeholder="Country"/>
        <button>Write</button>
      </form>
    );
  }
}