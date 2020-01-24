import React from 'react';
import { StyleSheet, Text,Image, View,Button, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import axios from 'axios';
import {AsyncStorage} from 'react-native';


export default class App extends React.Component {
  state={
    email:"w",
    password:"",
    articles: [],
  }
  UNSAFE_componentWillMount() {
    axios.get("http://127.0.0.1:3000/users").then(res => {
      this.setState({ articles: res.data});
    
  });
  }
  onPress = () => {
    if(this.state.email == ""){
        alert("Email field is empty ")
    }else{
        this.state.articles.map((item, i) => {

            if(item.email == this.state.email && item.password == this.state.password){
                
              global.UID123_object = {
                  id: item.id,
              };
              AsyncStorage.setItem('loginuser', JSON.stringify(global.UID123_object));
                this.props.navigation.navigate('Main')
            }
          
        })
    }
}
  render(){
    const { navigate } = this.props.navigation;
    return (
        
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/images/havefunlogoflme.png')} />
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={this.onPress} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
          <Text style={styles.loginText}>Signup</Text>
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
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
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