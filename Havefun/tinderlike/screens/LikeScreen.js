import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import axios from 'axios';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'
//uri: require('../assets/images/mig.png')

const Users = [{"id":1,"name":"Mladen","uri": require('../assets/images/mig.png'),"lastname":"Pantic","year":19,"job":"tjener\r\n","about":"jeg er sÃ¸d","firma":"mpfixer","School":"mercantec","city":"silkeborg","gender":"mand"},{"id":2,"name":"Hans","uri": require('../assets/images/mig.png'),"lastname":"Pantic","year":19,"job":"tjener\r\n","about":"ikke sÃ¥ sÃ¸d","firma":"mpfixer","School":"mercantec","city":"silkeborg","gender":"mand"}]

export default class App extends React.Component {

  
  constructor() {
    super();
    this.state = {  
      articles: [],
      currentIndex: 0,
      userid:"",
      Matcheid: "",
      liketordislike: "",
      data: "",
    }
  
    this.position = new Animated.ValueXY()
    
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH /2 ,0, SCREEN_WIDTH /2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }

  UNSAFE_componentWillMount() {
  

    /// laver swipe funtioen
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
       
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
    this.fetchData();
  }
  fetchData = async () => {
    axios.get("http://127.0.0.1:3000/users").then(res => {
      this.setState({ articles: res.data});
      console.log(res.data);
  });

  }
  
  likedislike = () =>{
    const data = {
      userid: 0,
      Matcheid: 0,
      liketordislike: 0
    };
    axios.post('http://127.0.0.1:3000/like', data).then(dbres => {
      this.setState({userid: dbres.data[0], Matcheid: dbres.data[0]});
      this.renderUsers(dbres.data[0]);
    });
   
  }

  renderUsers = () => {
    
    
    return this.state.articles.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null
        
      }
      else if (i == this.state.currentIndex) {

        return (
          
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <View style={styles.Brugerview}>
            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={require('../assets/images/mig.png')} />
              <Text style={styles.navn}>{item.name} <Text style={styles.year}>{item.year}</Text></Text>
              <Text style={styles.work}>{item.job}</Text>
              <Text style={styles.city}>{item.city}</Text>
              </View>
          </Animated.View>
        )
      }
      else {
        return (
          
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>
            <View style={styles.Brugerview}>
            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'contain', borderRadius: 20 }}
              source={require('../assets/images/mig.png')} />
              <Text style={styles.navn}>{item.name} <Text style={styles.year}>{item.year}</Text></Text>
              <Text style={styles.work}>{item.job}</Text>
              <Text style={styles.city}>{item.city}</Text>
              </View>
          </Animated.View>
          
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1, height: '19%' }}>
        <View style={{ flex: 1, top: '5%'}}>
        
  
          {this.renderUsers()}
        </View>


      </View>

    );
  }
}

const styles = StyleSheet.create({

  navn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    top: '2%',
    left: '5%',
    position: 'absolute', 
    zIndex: 999,
  },
  year: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ffff',
    position: 'absolute', 
    zIndex: 998,
  },
  city: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffff',
    top: '7.5%',
    left: '5%',
    position: 'absolute', 
    zIndex: 997,
  },
  work: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffff',
    top: '5%',
    left: '5%',
    position: 'absolute', 
    zIndex: 996,
  },

  Bruger2: {
    height: '80%',
    width: '95%',
    position: 'absolute', 
    zIndex: 900,
    borderRadius: 10,
  },
  Brugerview: {
    height: '90%',
    width: '99%',
    position: 'absolute', 
    zIndex: 899,
    top: '0%',
    left: '3%',
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
