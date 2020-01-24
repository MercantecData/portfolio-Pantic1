import React, { Component } from 'react';
import { View, StyleSheet, Text,TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {AsyncStorage} from 'react-native';



export default class App extends Component {
  state = {
    image: null,
    articles:[],
  };
  componentDidMount(){
    axios.get("http://127.0.0.1:3000/users").then(res => {
      this.setState({ articles: res.data});
      this.state.articles.map((item, i) => {
        global.imageurl = item.url
        global.name = item.name
        global.lastname = item.lastname
        global.year = item.year
      })
  });
  }
pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri })
      
      let base64Img = `data:image/jpg;base64,${result.base64}`
      
      //Add your cloud name
      let apiUrl = 'http://127.0.0.1:3000/insertprofilepic';
  
      let data = {
        "file": base64Img,
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
          let data = await r.json()
          console.log(data.secure_url)
          return data.secure_url
    }).catch(err=>console.log(err))
  }
}

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.pickImage()} style={{width: 150, alignSelf: 'center',top:'5%',position:"absolute"}}>
          <View style={{backgroundColor:'transparent'}}>
            {<Image source={{uri: global.imageurl}} style={{width: 150, height: 150, borderRadius: 100, alignSelf:'center'}}/>}
      </View>
      </TouchableOpacity>
  <Text style={styles.Navn}>{global.name} {global.lastname},{global.year}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  Navn:{
    fontSize:30,
    fontWeight:'500',
    top:'30%',
    position:"absolute",
    zIndex:3,
  }
});
