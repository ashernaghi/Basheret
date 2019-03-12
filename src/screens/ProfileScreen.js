import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles';
import { connect } from 'react-redux';

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity style={ styles.touchableOpacityHeader } onPress={() => navigation.navigate('Home')}>
          <Text style={ styles.headerText} >
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
      headerTitle: (
        <Text style={ styles.headerText} >
            Your Profile
        </Text>
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
        <Image source={{ uri: this.props.profilePhoto }} style={styles.profilePhoto}  />
        <Text>Name: {this.props.name}</Text>
        <Text>Gender: {this.props.gender}</Text>
        <Text>Denomination: {this.props.denomination}</Text>
        <Text>Kashrut Level: {this.props.kashrutObservance}</Text>
        <Text>Shabbat Observance: {this.props.shabbatObservance}</Text>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    denomination: state.userInfo.user.denomination,
    shabbatObservance: state.userInfo.user.shabbatObservance,
    kashrutObservance: state.userInfo.user.kashrutObservance,
    name: state.userInfo.user.fullName,
    profilePhoto: state.userInfo.user.profilePhoto,
    gender: state.userInfo.user.gender
  };
};

export default connect(mapStateToProps)(ProfileScreen);