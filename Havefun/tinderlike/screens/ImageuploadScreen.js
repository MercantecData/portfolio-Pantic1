import React, { Component } from 'react';
import { Button, Image,StyleSheet,View, Text,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import axios from 'axios';


export default class App extends Component {
  state = {
    image: null,
    LocalImage:[],
    multipleUrl:[],
    articles: [],
  };
  componentDidMount(){

    this.getPermissionAsync()

    AsyncStorage.getItem('altuderinfo', (err, result) => {
      let item = JSON.parse(result);  
          global.year = item.year
          global.gender = item.Gender
          global.prefer = item.Prefersel
          global.interested = item.selectedItems
          console.log(global.interested[1])
    });


    
   }
   getPermissionAsync = async () => {
    if (Constants.platform.ios) {const { status } = await                            Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this             work!')
          }
    } 
  }
  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    })
  let imageUri = pickerResult ?   `data:image/jpg;base64,${pickerResult.base64}` : null
     imageUri && {uri: imageUri}
     this.state.multipleUrl.push(imageUri)
     global.billde64 = imageUri
      this.setState({
  LocalImage: this.state.LocalImage.concat([pickerResult.uri]),
  })
  }
  _takePhoto = async () => {
  const {
  status: cameraPerm
  } = await Permissions.askAsync(Permissions.CAMERA)
  const {
  status: cameraRollPerm
  } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  // only if user allows permission to camera AND camera roll
  if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
  let pickerResult = await ImagePicker.launchCameraAsync({
       base64: true,
       allowsEditing: true,
       aspect: [4, 3],
  })
  if (!pickerResult.cancelled) {
     let imageUri = pickerResult ?     `data:image/jpg;base64,${pickerResult.base64}` : null
  this.state.multipleUrl.push(imageUri)
  this.setState({
  LocalImage: this.state.LocalImage.concat([pickerResult.uri]),

      })
  }
   }
  }
  _renderImages() {
    let images = []
  
    this.state.LocalImage.map((item, index) => {
 
       images.push(
         <Image  key={index} source={{ uri: item }}  style={{ width:   100, height: 100 }} />
         )
       })
    return images
  }
pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri })
  }
  
}

  render() {
    let style = []
    return (
      <View style={styles.container}>
        <Text style={{top:'6%',position:"absolute",fontSize:30}}>Upload Profilebillede</Text>
        <TouchableOpacity onPress={()=>this.pickImage()} style={{width: 200, alignSelf: 'center',position:"absolute",top:'12%',left:'32%'}}>
          <View style={{backgroundColor:'transparent'}}>
            {this.state.image?
              <Image source={{uri: this.state.image}} style={{width: 150, height: 150, borderRadius: 100, alignSelf:'center',right:'12%'}}/>
              :
              <View style={{ backgroundColor: 'grey',width: 150, height: 150, borderRadius: 100}}><Ionicons name="ios-camera" size={90} color="white" style={{top:'17%',left:'27%'}}/>
              </View>
            }
      </View>
      </TouchableOpacity>
          <View style={styles.mainView}>
              <View style={style.buttons}>
                    <Button title="Pick an image from camera roll"  onPress={this._pickImage}/>
              </View>
                <View style={style.buttons}>
                      <Button onPress={this._takePhoto} title="Take a photo" />
                </View>
              
                <View style={styles.containers}>
                  {this._renderImages()}
                </View>
                
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate("Main")}>
          <Text style={styles.loginText}>Start </Text>
        </TouchableOpacity>
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
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    top:'89%',
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});
