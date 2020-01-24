import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image,TextInput,Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import io from "socket.io-client";

  export default class ChatScreen extends React.Component {

  constructor() {
    super();
    this.state = {
       chatMessage: "",
       chatMessages: []
    };
 }

 componentDidMount() {
  this.socket = io("http://127.0.0.1:4000");
   this.socket.on("chat message", msg => {
         this.setState({ chatMessages: [...this.state.chatMessages, msg]   
    });
 });
}


render() {
  const chatMessages = this.state.chatMessages.map(chatMessage => (
    <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
  ));

  return (
        <View style={styles.container}>
          {chatMessages}
          <TextInput
            style={{height: 40, borderWidth: 2, top: 300}}
            autoCorrect={false}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({chatMessage});
            }}
          />
        </View>
        );
    }
    submitChatMessage() {
      this.socket.emit('chat message', this.state.chatMessage);
      this.setState({chatMessage: ''});
    }  
  }

  const styles = StyleSheet.create({
    container: {
      height: 400,
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });