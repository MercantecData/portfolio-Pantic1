import React, { Component } from 'react';
import { StyleSheet, Text, View,Button, Dimensions, Image, Animated, PanResponder, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { getUserInfo } from '../server/FetchUser';

export default class App extends Component {
  state = {
    image: null,
    person: null,
  };
async componentDidMount(){

};




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
      let apiUrl = 'http://127.0.0.1:3000/image';
  
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
      <View style = { styles.container }>
          <Image style={styles.billede} source={{uri: `data:image/gif;base64,${this.state.Text}`}}></Image>
          <Text style={styles.navn}>,</Text>
          <Text style={styles.year}>21</Text>
          <Text style={styles.school}>Mercantec</Text>
          
          <TouchableOpacity style={styles.settings}><Icon raised name='cog' size={37} type='font-awesome' color='#c9c5c5' onPress={() => console.log('hello')} /></TouchableOpacity>
          <TouchableOpacity style={styles.info}><Icon raised name='pencil' size={37} type='font-awesome' color='#c9c5c5' /></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.pickImage()} style={styles.plus}><Icon raised name='plus' size={17} type='font-awesome' color='#c9c5c5' onPress={() => console.log('hello')} /></TouchableOpacity>
          <Text style={styles.Instillingertext}>Instillinger</Text>
          <Text style={styles.Redigertext}>Rediger INFO</Text>
          <Text style={styles.addimagetext}>Tilføj billede</Text>

          <LinearGradient colors={['#ff9999', '#ff0000']} style={styles.addimage}>
          <Icon raised name='camera' size={45} type='font-awesome' color='#fff' onPress={() => console.log('hello')} />
          <TouchableOpacity onPress={()=>this.pickImage()} style={styles.addimage} ></TouchableOpacity>
          </LinearGradient>
          <View style={styles.mainview} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:
  {
      flex: 1,
      backgroundColor: '#f7f7f7' // Set your own custom Color
  },
  billede: {
    marginLeft: '30%',
    top: 150,
    height: 150,
    width: 100,
    borderRadius: 100,
    zIndex: 3,
    position: "absolute",
  },
  navn: {
  fontSize: 28,
  top: 310,
  marginLeft: '33%',
  fontWeight: '500',
  fontFamily: 'Avenir',
  zIndex: 4,
  position: "absolute",
  },
  year: {
    fontSize: 30,
    top: 308,
    marginLeft: '58%',
    fontWeight: '500',
    fontFamily: 'Avenir',
    zIndex: 5,
    position: "absolute",
    }, 
  school: {
      fontSize: 15,
      top: 350,
      marginLeft: '40%',
      fontWeight: '300',
      fontFamily: 'Avenir',
      zIndex: 6,
      position: "absolute",
    }, 
  settings: {
    borderWidth:1,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:65,
    height:65,
    backgroundColor:'#fff',
    borderRadius:50,
    zIndex: 7,
    position: "absolute",
    top: 380,
    left: '10%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 10 },
    },
  info: {
    borderWidth:1,
       borderColor:'#fff',
       alignItems:'center',
       justifyContent:'center',
       width:65,
       height:65,
       backgroundColor:'#fff',
       borderRadius:50,
       zIndex: 8,
       position: "absolute",
       top: 380,
       left: '73%',
       shadowColor: '#000',
       shadowOpacity: 0.2,
       shadowRadius: 10,
       shadowOffset: { width: 1, height: 10 },
    },
  addimage:{
      width: 100,
      height: 100,
      zIndex: 9,
      position: "absolute",
      top: 400,
      left: '38%',
      alignItems: 'center', 
      justifyContent: 'center',
      borderRadius: 50,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 1, height: 10 },
    },
    plus:{
      borderWidth:1,
      borderColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      width:35,
      height:35,
      backgroundColor:'#fff',
      borderRadius:50,
      zIndex: 10,
      position: "absolute",
      top: 470,
      left: '55%',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 1, height: 10 },
    },
    mainview: {
      marginTop: -60,
      width: 250,
      height: 640,
      backgroundColor: '#fff',
      borderRadius: 90,
      transform: [{ scaleX: 2 }],
      left:87,
      zIndex: 0,
      position: "absolute",
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 1, height: 10 },
    },
    Instillingertext:{
      fontSize: 15,
      top: 455,
      marginLeft: '6%',
      fontWeight: '300',
      fontFamily: 'Avenir',
      zIndex: 6,
      position: "absolute",
      textTransform: 'uppercase',
      color: '#ababab',
      fontWeight: '600',
    },
    Redigertext:{
      fontSize: 15,
      top: 455,
      marginLeft: '68%',
      fontWeight: '300',
      fontFamily: 'Avenir',
      zIndex: 6,
      position: "absolute",
      textTransform: 'uppercase',
      color: '#ababab',
      fontWeight: '600',
    },
    addimagetext:{
      fontSize: 15,
      top: 520,
      marginLeft: '36%',
      fontWeight: '300',
      fontFamily: 'Avenir',
      zIndex: 6,
      position: "absolute",
      textTransform: 'uppercase',
      color: '#ababab',
      fontWeight: '600',
    },
 
});
