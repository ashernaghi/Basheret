import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles';
import { connect } from 'react-redux';

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity style={ styles.touchableOpacityHeader } onPress={() => navigation.navigate('Home')}>
          <Text style={ styles.headerTextRight } >
            Home
          </Text>
          <Ionicons 
            name="ios-arrow-forward" 
            size={32} 
            color="black"
            style={styles.headerIcons} 
          />
        </TouchableOpacity>
      ),
      headerLeft: (
        <Ionicons 
          onPress={() => navigation.navigate('Settings')}
          name="ios-settings" 
          size={32} 
          color="black" 
          style={styles.headerIcons} 
        />
      ),
    }
  };
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#b2d8a4' }}>
        <Text>User can see/preview/edit their profile here, as well as change their preferences for filters and such</Text>
        <Text>Denomination: {this.props.denomination}</Text>
        <Text>Kashrut Level: {this.props.kashrutLevel}</Text>
        <Text>Shabbat Observance: {this.props.shabbatObservance}</Text>
      </View>
    );
  };
}

const mapStateToProps = state => {
  console.log('STATE', state.userInfo)
  return {
    denomination: state.userInfo.denomination,
    shabbatObservance: state.userInfo.shabbatObservance,
    kashrutLevel: state.userInfo.kashrutLevel
  };
};

export default connect(mapStateToProps)(ProfileScreen);