import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chats',
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <Ionicons 
          onPress={() => navigation.navigate('Home')} 
          name="ios-arrow-back" 
          size={32} 
          color="black" 
        />
      ),
    }
  };
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chats and Matches will be here</Text>
      </View>
    );
  }
}
