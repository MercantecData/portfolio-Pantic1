import React, { Component } from 'react';
export default class App extends Component {
    state = {
      image: null,
      person: null,
    };
  async componentDidMount(){
      const url = "http://127.0.0.1:3000/getprofilbillede";
      const response = await fetch(url);
      const data = await response.JSON();
     // this.setState({person: null});
      
        //GET request 
    fetch("http://127.0.0.1:3000/getprofilbillede")
    .then(res => res.JSON())
    .then(users => this.setState({users}));
    console.log(users);
  };
}  