import React from 'react';
import { View } from 'react-native';
import IntroAnswer from './IntroAnswer'

export default class IntroAnswerList extends React.Component {
  generateAnswers(){
    return this.props.answers.map((answer, index)=><IntroAnswer key={index} onPress={this.props.onPress} answer={answer} />)
  }

  render(){
    return (
      //the righter most part of the array will override if provided
      <View >
        {this.generateAnswers()}
      </View>
    );
  }
};
