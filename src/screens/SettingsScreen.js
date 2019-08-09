import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch, Button } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { Ionicons, FontAwesome, Foundation } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { updateUserInfo } from '../actions/UserInfoActions';
import styles from '../styles/styles';
import {options, questions, category} from '../common/arrays'
import firebase from '../actions/firebase'
import Header from '../components/Header';

export class SettingsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        header: null,
      }
    };

  calculateIndex(value){
    return  value >= 0 && value <25 ? 0
    : value >= 25 && value <50  ? 1
    : value >= 50 && value <75  ? 2
    : value >= 75 && value <99  ? 3
    : 4;
  }

  changeValue = (values, category) => {
    let finalCategory = category==="Denomination" ? 'denominationPreference' : category==="Shabbat Observance" ? 'shabbatPreference' : category==="Kashrut Observance" ?'kashrutPreference' : category==="Age" ? 'agePreference' : category==="Distance" ? 'distancePreference' : category;
    let finalValue = values.length ===1 ? values[0] : values;
    this.props.dispatch(updateUserInfo('preferences',finalCategory, finalValue))
  }

  generateFilters(){
    let preferences = [{'Denomination': this.props.denominationPreference}, {'Shabbat Observance': this.props.shabbatPreference}, {'Kashrut Observance': this.props.kashrutPreference}, {'Age': this.props.agePreference}]

    return preferences.map((preference, index)=>{
      let key = Object.keys(preference)[0];
      let values = Object.values(preference)[0];

      var number = 1;
      if(key === 'Denomination'){
         number = 1
      } else if( key === 'Kashrut Observance'){
         number = 2
      } else if(key === 'Shabbat Observance'){
         number = 3
      } else if(key === 'Age'){
         number = 4
      }


      return(
        <View key={index} style={styles.filterContainer}>
          <Text style={{ fontWeight: 'bold', paddingBottom: 10, paddingTop: 2.5, paddingLeft: 2.5, }}> {key} </Text>

          <View style={{ alignItems: 'center' }}>
            <MultiSlider
              markerStyle={{width:20, height: 20, borderRadius: 10, backgroundColor: '#00387E'}}
              selectedStyle={{backgroundColor: '#00387E'}}
              values={values}
              onValuesChange={values=>this.changeValue(values, key)}
              min={key==="Age" ? 18 : 0}
              max={key==="Age" ? 39 : 100}
              step={key==="Age" ? 1 : 5}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5 }}>
            {this.renderLabels(number, key, values[0], values[1])}
          </View>

        </View>
      )
    })
  }

  renderLabels(number, key, values0, values1){
  if ( number < 4 ) {
    return options[number].map((label, index)=> {

        return <Text style={{fontSize: 10, textAlign: 'center' }} key={index}>{label}</Text>

    })
  }
  else {
    return (
      <View style={{flex: 1}}>
        <Text style={{alignSelf: 'center'}}>{values0}-{values1}</Text>
      </View>
    )
  }
}

 

  onSignOut = async () => {
    try {
      console.log('SIGNING OUT')
        await firebase.auth().signOut()
        this.props.navigation.navigate('OnboardingStack');
    } catch (e) {
        console.warn(e)
    }
  }

  render() {
    let femaleIcon =
    <FontAwesome
      name="female"
      size={25}
      color="black"
    />

    let maleIcon =
    <FontAwesome
      name="male"
      size={25}
      color="black"
    />

    let bothIcon =
    <Foundation
      name="male-female"
      size={25}
      color="black"
    />

    let gp = this.props.genderPreference;

    return (

      <SafeAreaView style={{ backgroundColor: '#F4F4F4' }}>
      <ScrollView style={styles.settingsContainer}>
        <Header navigation={this.props.navigation} text='Settings' rightIconName="ios-arrow-forward" rightDestination="Profile"/>

        <View style={styles.dividerContainer}>
          <Text style={{ fontWeight: 'bold', paddingLeft: 3}}>
            Discoverable
          </Text>

          <Switch
            trackColor={{true: "#9DB7E8"}}
            thumbColor='#00387E'
            onValueChange={() => this.changeValue(!this.props.discoverable, 'discoverable')}
            value={this.props.discoverable} />
        </View>

        <Text style={styles.settingsTitle}>
            Filters
        </Text>

        {this.generateFilters()}

        <View style={styles.filterContainer}>
          <Text style={styles.headerText}>
            Distance
          </Text>

          <MultiSlider
            markerStyle={{width:20, height: 20, borderRadius: 10, backgroundColor: '#00387E'}}
            selectedStyle={{backgroundColor: '#00387E'}}
            values={[this.props.distancePreference]}
            onValuesChange={values=>this.changeValue(values, 'Distance')}
            min={100}
            max={1000}
            step={10}
          />

          <Text style={{alignSelf: 'center'}}>
            {this.props.distancePreference}
          </Text>
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.headerText}>
            Match Gender: {gp}
          </Text>

          <SwitchSelector
            initial={gp==="Female" ? 0 : gp==="Male" ? 1 : 2}
            imageStyle={{justifyContent: 'center', alignItems: 'center'}}
            backgroundColor='rgba(0, 56, 126, .3)'
            onPress={value => this.changeValue(value, 'genderPreference')}
            buttonColor='rgba(0, 56, 126, .8)'
            height={50}
            borderRadius='200'
            style={{width: 200, padding: 10}}
            options={[
              { value: "Female", customIcon: femaleIcon },
              { value: "Male", customIcon: maleIcon },
              { value: "Both", customIcon: bothIcon },
            ]}
          />
        </View>
        <View style={{justifyContent: 'space-between', alignItems: 'center',  height: 115, marginTop: 50}}>

          <TouchableOpacity
            style={{ width: 195, height: 50, backgroundColor: 'white', borderColor: '#00387E', borderWidth: 2.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}
            onPress={this.onSignOut}
          >
            <Text style={{fontSize: 18, color: '#555555', fontWeight: 'bold', }}>Sign out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: 195, height: 50, backgroundColor: 'white', borderColor: '#00387E', borderWidth: 2.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}
          >
            <Text style={{fontSize: 18, color: '#555555', fontWeight: 'bold', }}>Delete Account</Text>
          </TouchableOpacity>

        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 25, paddingBottom: 50, }}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 50, color: '#00387E',  }}>B</Text>
        </View>
      </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    denominationPreference: state.userInfo.user.preferences.denominationPreference,
    shabbatPreference: state.userInfo.user.preferences.shabbatPreference,
    kashrutPreference: state.userInfo.user.preferences.kashrutPreference,
    genderPreference: state.userInfo.user.preferences.genderPreference,
    agePreference: state.userInfo.user.preferences.agePreference,
    distancePreference: state.userInfo.user.preferences.distancePreference,
    discoverable: state.userInfo.user.preferences.discoverable,
  };
};

export default connect(mapStateToProps)(SettingsScreen);
