import React from 'react';
import { View, Text, Button } from 'react-native';

export default class EditModalScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'blue', paddingTop:50 }}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Done"
        />
      </View>
    );
  }
}
