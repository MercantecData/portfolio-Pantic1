import React from 'react';
import { StyleSheet, Text,Image, View,Button, TextInput, TouchableOpacity } from 'react-native';
import { Icon, withTheme } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

export default class Signup extends React.Component {
  constructor(props){
    super(props);
  this.state={
    email:"",
    password:"",
    Navn:"",
    Efternavn:"",
    Repassword:"",
    articles: [],
  }
  }
  componentDidMount() {
    axios.get("http://127.0.0.1:3000/users").then(res => {
      this.setState({ articles: res.data});
    
  });

  }
  


  Nextside = () => {
    let UID123_object = {
      email: this.state.email,
      password: this.state.password,
      Navn: this.state.Navn,
      Efternavn: this.state.Efternavn,
      Repassword: this.state.Repassword,
    };
    AsyncStorage.setItem('infoside', JSON.stringify(UID123_object));
  
  this.props.navigation.navigate('SignupDetails');
  }

  render(){
    return (
      <View style={styles.container}>
     <Image style={styles.logo} source={require('../assets/images/havefunlogoflme.png')} />
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Navn..." 
            placeholderTextColor="#859dff"
            onChangeText={text1 => this.setState({Navn:text1})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Efternavn..." 
            placeholderTextColor="#859dff"
            onChangeText={text2 => this.setState({Efternavn:text2})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#859dff"
            onChangeText={text3 => this.setState({email:text3})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#859dff"
            onChangeText={text4 => this.setState({password:text4})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Retype Password..." 
            placeholderTextColor="#859dff"
            onChangeText={text5 => this.setState({Repassword:text5})}/>
        </View>
        <TouchableOpacity   onPress={() => this.Nextside()} style={styles.loginBtn}>
          <Text style={styles.loginText}>Next</Text> 
        </TouchableOpacity>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'100%',
  },
  logo:{
    width: '80%', 
    alignSelf:'center',
    resizeMode: 'contain',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    color: '#fff',
  },
  inputText:{
    height:50,
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});