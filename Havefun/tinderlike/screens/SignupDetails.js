import React from 'react';
import { StyleSheet,ScrollView,SafeAreaView, Text,Image, View,Button, TextInput, TouchableOpacity } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Slider } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import CheckboxFormX from 'react-native-checkbox-form';


export default class SignupDetails extends React.Component {
  
  constructor(){
    super();
    this.state={
      year:"18",
      selectedItems:[],
      Gender:[],
      Prefersel:[],
      Getsex:[],
      Getsexny:[],
    }
  }
 
  componentDidMount() {

    AsyncStorage.getItem('infoside', (err, result) => {
      global.infoside = result;
    });
  
  global.UID123_object = {
    year: this.state.year,
    selectedItems: this.state.selectedItems,
    Gender: this.state.Gender,
    Prefersel: this.state.Getsex,
    prefer: global.Getper,
    infoside: global.infoside,
  };

 }
onSelectedItemsChange = selectedItems => {
  this.state.selectedItems.push({selectedItems})
};

_onSelect = ( funPreferSel ) => {

  funPreferSel.map((item, i) => {
      
    if(item.RNchecked == true){
      
      this.state.Getsex.push({ label: item.label, value:item.value });
    } else if(item.RNchecked == false){}
  })

};
onPress = () => {
  if(this.state.Gender == 0){
      alert("One of the field is empty ")
  }else{

    AsyncStorage.setItem('altuderinfo', JSON.stringify(global.UID123_object));
    
    this.props.navigation.navigate('Imageupload')

  }
}
  render(){
    const { selectedItems } = this.state;
    let data = [{
      value: 'Men',
    }, {
      value: 'Women',
    }, {
      value: 'trans',
    }];
 
 
  let items = [{
    id: 'Men',
    name: 'Men',
  }, {
    id: 'Women',
    name: 'Women',
  }, {
    id: 'Other',
    name: 'Other',
  }];
 
  let prefer = [{
    value: '1',
    label: 'Rough Sex',
  }, {
    value: '2',
    label: 'Vaginalsex',
  }, {
    value: '3',
    label: 'Oralsex',
  }, {
    value: '4 ',
    label: 'Analsex ',
  }, {
    value: '5',
    label: 'Fingering or hand jobs',
  }, {
    value: '6',
    label: 'Dry humping or genital rubbing.',
  }, {
    value: '7',
    label: 'Masturbation (touching yourself)',
  }, {
    value: '8',
    label: 'Pornography',
  }, {
    value: '9',
    label: 'Group sex',
  }, {
    value: '10',
    label: 'Sexting and online sex',
  }, {
    value: '11',
    label: 'Sensual Sex',
  }, {
    value: ' 12',
    label: ' Spontaneous Sex',
  }, {
    value: '13',
    label: 'Hotel Sex',
  }, {
    value: '14',
    label: 'Shower sex',
  }, {
    value: '15',
    label: 'Role-play sex',
  }, {
    value: '16',
    label: 'Sex on the beach',
  }, {
    value: '17',
    label: 'All and more',
  }];
 
    return (
      <View style={styles.container}>
  <View style={{flex: 1, flexDirection: 'row'}}>

</View>
        <View style={styles.Slider} >
        <Text  style={{color:'white',fontSize:20,}}>How old are you?</Text>
    <Text  style={{color:'white',fontSize:20,}}>{Math.round(this.state.year)} Years</Text>
        <Slider
            minimumValue={18}
            maximumValue={100}
            minimumTrackTintColor='#1fb28a'
            maximumTrackTintColor='#d3d3d3'
            thumbTintColor='#1a9274'
            onValueChange={(year1) => this.setState({year:year1})}
          />
        </View>
        <View style={styles.gender} >
        <Dropdown label='Gender' textColor='black' onChangeText={(gender1) => this.state.Gender.push({Gender:gender1})} data={data} dropdownPosition='0'/>
        </View>
        <View  style={styles.multisel} >
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Interested in?"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#000"
          tagBorderColor="#757575"
          tagTextColor="#fff"
          textColor="#fff"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          itemTextColor="#000"
          displayKey="name"
          styleMainWrapper={{ paddingTop:'2%', borderRadius:35}}
          styleMainWrapper={{ borderRadius:25}}
          styleDropdownMenuSubsection={{ paddingBottom:'1%',paddingTop:'1%',paddingLeft:'8%', borderRadius:25, backgroundColor: '#465881', height:60}}
          submitButtonColor="#fb5b5a"
          submitButtonText="Select"
        />
        </View>
        <View style={styles.container}>
        <SafeAreaView style={{width:'80%'}} >
        <ScrollView style={{marginVertical: 50,backgroundColor: "#465881",borderTopRightRadius:25,borderBottomRightRadius:25 }} >
              <CheckboxFormX
                  style={{}}
                  dataSource={prefer}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={35}
                  onChecked={(funPreferSel) => this._onSelect(funPreferSel)}
              />
          </ScrollView>
        </SafeAreaView>
</View>
        <TouchableOpacity   onPress={this.onPress} style={styles.loginBtn}>
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
  multisel:{
    flex: 1,
    backgroundColor: '#003f5c',
    padding: 10,
    top:'37%',
    width:"85%",
    position:"absolute",
    zIndex:44,
  },

  Slider:{
    width:"80%",
    borderRadius:25,
    top:'10%',
    justifyContent:"center",
    padding:5,
    zIndex: 3,
    position: "absolute",
    color: '#fff',
  },
  logo:{
    width: '80%', 
    alignSelf:'center',
    resizeMode: 'contain',
  },
  gender:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    top:'24%',
    height:60,
    marginBottom:400,
    justifyContent:"center",
    paddingBottom:20,
    paddingLeft:'6%',
    paddingRight:'8%',
    zIndex: 3,
    position: "absolute",
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