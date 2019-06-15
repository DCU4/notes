import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Nav from "../presentational/Nav.jsx";
import Form from "../presentational/Form.jsx";


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: ''
    }
  }

  

  getWeather = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.NAME);
  
  }


  render() {

    return (
      
      <main>
        <h1>Weather App</h1>
        <Form 
          getWeather={this.getWeather}
          error={this.state.error}
          class={this.state.class} 
        />

      </main>
    );
  }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
