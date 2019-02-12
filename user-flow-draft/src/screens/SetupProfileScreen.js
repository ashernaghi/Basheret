import React from 'react';
import { View, Text } from 'react-native';
import { Input } from 'react-native-elements'


export default class SetupProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Input
  placeholder='INPUT WITH SHAKING EFFECT'
  shake={true}
/>
        
      </View>
    );
  }
}

//user sees this after filling out intro questions. Must fill out short bio, current city and state, education, high school, current job, upload profile picture. "Done" button on the bottom will only appear after they've filled out this info. After they click done it navigates to FinishedQuestions

