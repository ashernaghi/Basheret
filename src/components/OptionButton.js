import React, { Component } from "react";
import { View, Text, TouchableOpacity } from 'react-native';

export default class OptionButton extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    return(
      <TouchableOpacity
      style={this.props.style}
      >
        <Text style={this.props.labelstyle}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
}
