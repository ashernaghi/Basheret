import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, Switch,  } from 'react-native';
import { Slider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { updateUserInfo } from '../actions/UserInfoActions';
import styles from '../styles/styles';

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

  changeValue = (values, category) => {
    let finalCategory = category==="Denomination" ? 'denominationPreference' : category==="Shabbat Observance" ? 'shabbatPreference' : category==="Kashrut Observance" ?'kashrutPreference' : category==="Age" ?'agePreference' : category==="Distance" ? 'distancePreference' : category;
    let finalValue = values.length===1 ? values[0] : values;
    this.props.dispatch(updateUserInfo(finalCategory, finalValue))
  }

  // Handle change of switch state
  handleSwitch = (category) => {
    this.props.dispatch(updateUserInfo(category, !this.props[category]))
  }

  generateFilters(){
    let preferences = [{'Denomination': this.props.denominationPreference}, {'Shabbat Observance': this.props.shabbatPreference}, {'Kashrut Observance': this.props.kashrutPreference}, {'Age': this.props.agePreference}]

    return preferences.map((preference, index)=>{
      let key = Object.keys(preference)[0];
      let values = Object.values(preference)[0]
      return(
        <View key={index} style={styles.filterContainer}>
          <Text>
            {key}: 
          </Text>
          
          {key==="Age" &&<Text>
            {values[0]}-{values[1]} 
          </Text>
          }
          <MultiSlider
            markerStyle={{width:10, height: 25}}
            values={values}
            onValuesChange={values=>this.changeValue(values, key)}
            min={values[0]}
            max={values[1]}
            step={key==="Age" ? 1: 5}
          />
        </View>
      )
    })
  }

  render() {
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
       
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  // console.log('IN SETTINGS, STATE:', state)
  return {
    denominationPreference: state.userInfo.denominationPreference,
    shabbatPreference: state.userInfo.shabbatPreference,
    kashrutPreference: state.userInfo.kashrutPreference,
    agePreference: state.userInfo.agePreference,
    distancePreference: state.userInfo.distancePreference,
    discoverable: state.userInfo.discoverable,
  };
};

export default connect(mapStateToProps)(SettingsScreen);