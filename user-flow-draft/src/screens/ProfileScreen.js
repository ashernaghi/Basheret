import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles';

export default class ProfileScreen extends React.Component {
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
      </View>
    );
  }
}
