import React, { Component } from 'react';


export default class SingleNote extends Component {
  constructor(props) {
    super(props);
  
  }
  
  getSingleNote(){
    console.log('getting signle note')
    // let api = this.state.apiResponse;
    let id = this.props.id;
    if(!this.props || id == undefined){
      return null; //You can change here to put a customized loading spinner
    }
    
    id.forEach(i => {
      let url  = "https://dc-notes.herokuapp.com/"+i
      console.log(url);
    });
      
    fetch(url)
        .then(res => res.json())
        .then(res => this.setState({ apiResponse: res }),
        // console.log(this.state.apiResponse)
        );
  }
  componentWillMount() {
    this.getSingleNote();
}

  render() {
    
    let note = this.props.note;
    let id = this.props.id
    console.log(this.props); 
    if(!this.props || this.props.note == undefined){
      return null; //You can change here to put a customized loading spinner
    }
    
    return (
      // <ul>
      <a onClick={this.getSingleNote} href={"/"+id}><li> {note} </li></a>

        // {this.props.items.map((item, index) => <li key={index}>{item}</li>)}
      // </ul>
    );
  }
}