import React from 'react';
import { Text, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles from '../styles/styles';

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
        style={[styles.answerTouchable, {backgroundColor: this.state.bg}]} 
        onPress={()=>this.props.onPress(this.props.answer)} 
        underlayColor='transparent'
        activeOpacity= {1}
        onShowUnderlay={()=>this.setState({bg: 'pink'})}
      >
        <Text style={styles.answerText} >{this.props.answer}</Text>
      </TouchableHighlight>
    );    
  }
};