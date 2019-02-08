import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/styles'

export default IntroQuestion = (props) => {
  return (
    //the righter most part of the array will override if provided
    <Text style={styles.question} >
      {props.question}
    </Text>
  );
};

