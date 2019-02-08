import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity style= { styles.touchableOpacityHeader } onPress={() => navigation.navigate('Profile')}>
          <Text style={ styles.headerTextRight } >
            Edit Profile
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
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'beige' }}>
        <Text>General Settings (privacy policy, account management, etc</Text>
      </View>
    );
  }
}
