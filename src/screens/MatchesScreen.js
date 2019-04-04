import React from 'react';
import { View, Text } from 'react-native';

export default class MatchesScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.generateMatches}
        <Text>All Matches Will Be Here</Text>
      </View>
    );
  }
}
