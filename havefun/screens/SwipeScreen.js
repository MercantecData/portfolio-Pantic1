import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';


export default function SwipeScreen() {
  return (
    <View>
<CardStack
        style={styles.content}
        renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
        onSwiped={() => console.log('onSwiped')}
        onSwipedLeft={() => console.log('onSwipedLeft')}
        ref={(component) => { this.swiper = component; }}
        showsPagination={false}
      >

        <Card style={[styles.card, styles.Bruger1]}><Text style={styles.label}>A</Text></Card>
        <Card style={[styles.card, styles.Bruger2]} onSwipedLeft={() => alert('onSwipedLeft')}><Text style={styles.label}>B</Text></Card>
        <Card style={[styles.card, styles.Bruger1]}><Text style={styles.label}>C</Text></Card>
        <Card style={[styles.card, styles.Bruger2]}><Text style={styles.label}>D</Text></Card>
        <Card style={[styles.card, styles.Bruger1]}><Text style={styles.label}>E</Text></Card>
      </CardStack>

      <View >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
            this.swiper.swipeLeft();
          }}>
            <Image source={require('../assets/images/dislike.png')} resizeMode={'contain'} style={{ height: 62, width: 62,top:'1000%',left: '9%' }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => {
            this.swiper.goBackFromLeft();
          }}>
            <Image source={require('../assets/images/fortryd.png')} resizeMode={'contain'} style={{ height: 62, width: 62,left: '43%',top:'900%',zIndex: 104, borderRadius: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
            this.swiper.swipeRight();
          }}>
            <Image source={require('../assets/images/like.png')} resizeMode={'contain'} style={{ height: 62, width: 62, top:'800%',left: '75%',zIndex: 104 }} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};


SwipeScreen.navigationOptions = {
  title: 'Swipe',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'black',
  },
  Bruger1: {
    height: '95%',
    width: '94%',
    position: 'absolute', 
    zIndex: 299,
    top: '3%',
    left: '3%',
    backgroundColor: '#0000',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  
  },
  Bruger2: {
    height: '95%',
    width: '94%',
    position: 'absolute', 
    zIndex: 299,
    top: '3%',
    left: '3%',
    backgroundColor: '#00ff00',
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
