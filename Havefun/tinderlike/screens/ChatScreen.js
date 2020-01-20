import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import axios from 'axios';

export default class App extends Component {
    state = {
      image: null,
      person: null,
    };
  async componentDidMount(){

      axios.get("http://127.0.0.1:3000/getprofilbillede").then((response) => {
          console.log(response.data)
          this.setState({data : response.data})
        })
        .catch(error => {
          console.log(error);
        });
        
 
    }
  

  render() {
    return (
      <View style={{ flex: 1, height: '19%' }}>
        <View style={{ flex: 1, top: '5%'}}>

        </View>


      </View>

    );
    
  }
  
}  