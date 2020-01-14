import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import Swiper from 'react-native-deck-swiper'
import { withTheme } from 'react-native-elements';


export default function SwipeScreen() {
  return (
    
    <View style={styles.container}>
      
    <Swiper
     cards = {[
      {
       
        Name: 'Mladen Pantic',
        year: '19',
        work: 'Tjener',
        city: 'Silkeborg'
       }
  ]}
  
        renderCard={(cards) => {
            return (
                <View style={styles.Brugerview}>
                    <Image style={styles.Bruger2} source={require('../assets/images/mig.jpg')} />
                    <Text style={styles.navn}>{cards.Name} <Text style={styles.year}>{cards.year}</Text></Text>
                    <Text style={styles.work}>{cards.work}</Text>
                    <Text style={styles.city}>{cards.city}</Text>
                </View>
            )
        }}
        onSwiped={(cardIndex) => {console.log(cardIndex)}}
        onSwipedAll={() => {console.log('onSwipedAll')}}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize= {3}>
    </Swiper>
</View>

  )};


SwipeScreen.navigationOptions = {
  title: 'Swipe',
};

const styles = StyleSheet.create({

  navn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    top: '2%',
    left: '5%',
    position: 'absolute', 
    zIndex: 3,
  },
  year: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ffff',
    position: 'absolute', 
    zIndex: 4,
  },
  city: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffff',
    top: '7.5%',
    left: '5%',
    position: 'absolute', 
    zIndex: 2,
  },
  work: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffff',
    top: '5%',
    left: '5%',
    position: 'absolute', 
    zIndex: 8,
  },

  Bruger2: {
    height: '80%',
    width: '95%',
    position: 'absolute', 
    zIndex: 1,
    borderRadius: 10,
  },
  Brugerview: {
    height: '105%',
    width: '106%',
    position: 'absolute', 
    zIndex: 1,
    top: '0%',
    left: '0.1%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  
  }
});
