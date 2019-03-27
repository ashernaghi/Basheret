import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, Switch,  } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { Ionicons, FontAwesome, Foundation } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { updateUserInfo } from '../actions/UserInfoActions';
import styles from '../styles/styles';
import {options, questions, category} from '../common/arrays'

export class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={ styles.headerText} >
            Settings
        </Text>
      ),
      headerRight: (
        <TouchableOpacity style= { styles.touchableOpacityHeader } onPress={() => navigation.navigate('Profile')}>
          <Text style={ styles.headerText } >
            Profile
          </Text>
          <Ionicons 
            name="ios-arrow-forward" 
            size={32} 
            color="black" 
            style={styles.headerIcons} 
          />
        </TouchableOpacity>
      ),
      headerLeft: null,
    }
  };

  calculateIndex(value){
    return  value >= 0 && value <25 ? 0 
    : value >= 25 && value <50  ? 1
    : value >= 50 && value <75  ? 2
    : value >= 75 && value <99  ? 3
    : 4;
  }

  calculateText(key, values0, values1){
    let leftIndex = this.calculateIndex(values0);
    let rightIndex = this.calculateIndex(values1);
    let same = leftIndex===rightIndex ? true : false;

    if (key==='Age'){
      return `${values0}-${values1}`
    }
    else if (key==='Denomination'){
      return same ? options[1][leftIndex] : `${options[1][leftIndex]}-${options[1][rightIndex]}`
    }
    else if (key==='Shabbat Observance'){
      return same ? options[2][leftIndex] : `${options[2][leftIndex]}-${options[2][rightIndex]}`
    }
    else if (key==='Kashrut Observance'){
      return same ? options[3][leftIndex] : `${options[3][leftIndex]}-${options[3][rightIndex]}`
    }
  }

  changeValue = (values, category) => {
    let finalCategory = category==="Denomination" ? 'denominationPreference' : category==="Shabbat Observance" ? 'shabbatPreference' : category==="Kashrut Observance" ?'kashrutPreference' : category==="Age" ? 'agePreference' : category==="Distance" ? 'distancePreference' : category;
    let finalValue = values.length ===1 ? values[0] : values;
    this.props.dispatch(updateUserInfo(finalCategory, finalValue, 'preferences'))
  }

  generateFilters(){
    let preferences = [{'Denomination': this.props.denominationPreference}, {'Shabbat Observance': this.props.shabbatPreference}, {'Kashrut Observance': this.props.kashrutPreference}, {'Age': this.props.agePreference}]

    return preferences.map((preference, index)=>{
      let key = Object.keys(preference)[0];
      let values = Object.values(preference)[0];

      return(
        <View key={index} style={styles.filterContainer}>
          <Text>
            {key}: {this.calculateText(key, values[0], values[1])} 
          </Text>

          <MultiSlider
            markerStyle={{width:10, height: 25}}
            values={values}
            onValuesChange={values=>this.changeValue(values, key)}
            min={key==="Age" ? 18 : 0}
            max={key==="Age" ? 39 : 100}
            step={key==="Age" ? 1: 5}
          />
        </View>
      )
    })
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
      <ScrollView style={styles.settingsContainer}>
        <View style={styles.dividerContainer}>
          <Text>
            Discoverable 
          </Text>

          <Switch 
            trackColor={{true: "pink"}} 
            onValueChange={() => this.changeValue(!this.props.discoverable, 'discoverable')} 
            value={this.props.discoverable} />
        </View>

        <Text style={styles.settingsTitle}>
            Preferences For Potential Basheret 
        </Text>

        {this.generateFilters()}
        
        <View style={styles.filterContainer}>
          <Text>
            Distance: 
          </Text>

          <Text>
            {this.props.distancePreference} 
          </Text>
          
          <MultiSlider
            markerStyle={{width:10, height: 25}}
            values={[this.props.distancePreference]}
            onValuesChange={values=>this.changeValue(values, 'Distance')}
            min={100}
            max={1000}
            step={100}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <Text>
            Gender: {gp}
          </Text>

          <SwitchSelector
            initial={gp==="Female" ? 0 : gp==="Male" ? 1 : 2}
            imageStyle={{justifyContent: 'center', alignItems: 'center'}}
            backgroundColor='rgba(232, 171, 227, .3)'
            onPress={value => this.changeValue(value, 'genderPreference')}
            buttonColor='rgb(232, 171, 227)'
            height={50}
            borderRadius='200'
            style={{width: 200}}
            options={[
              { value: "Female", customIcon: femaleIcon }, 
              { value: "Male", customIcon: maleIcon },
              { value: "Both", customIcon: bothIcon },
            ]}
          />
        </View>
      </ScrollView>
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