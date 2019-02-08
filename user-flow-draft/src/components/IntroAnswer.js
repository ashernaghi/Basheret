import React from 'react';
import { Text, Button, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';

export default class IntroAnswer extends React.Component {
  constructor(props){
    super(props);

    this.state={
      bg: 'transparent',
    }
  }
  render(){
    return (
      //the righter most part of the array will override if provided
      <TouchableHighlight 
        style={[styles.answerChoice, {backgroundColor: this.state.bg}]} 
        onPress={this.props.onPress} 
        underlayColor='transparent'
        activeOpacity= {1}
        onShowUnderlay={()=>this.setState({bg: 'pink'})}
      >
        <Text>{this.props.answer}</Text>
      </TouchableHighlight>
    );    
  }
};

const styles = StyleSheet.create({
  answerChoice: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
  }
})