import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class SaveButton extends React.Component {
  constructor(props){
    super(props);

    this.state={
      bg: 'transparent',
      disabled: false,
    }
  }
  render(){
    return (
      //the righter most part of the array will override if provided
      <TouchableHighlight
        style={[styles.answerTouchable, {backgroundColor: this.state.bg}]}
        onPress={()=>this.props.onPress()}
        underlayColor='transparent'
        activeOpacity= {1}
        disabled={this.state.disabled}
        onShowUnderlay={()=>this.setState({bg: 'pink', disabled: true})}
      >
        <Text style={styles.answerText} >{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  answerTouchable: {
    borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    width: 100,
    alignItems: 'center'
  },

  answerText: {
    fontSize: 17
  },
})
