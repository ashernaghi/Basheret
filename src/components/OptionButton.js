import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class OptionButton extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    return(
      <TouchableOpacity
      style={this.props.style}
      onPress={this.props.onPress}
      >
        <Text style={styles.buttonTextStyle}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create ({
  buttonTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    padding: 18,
    fontWeight: 'bold',
  },
})
