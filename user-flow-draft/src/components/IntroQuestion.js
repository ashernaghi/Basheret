import React from 'react';
import { Text } from 'react-native';

export default IntroQuestion = (props) => {
  return (
    //the righter most part of the array will override if provided
    <Text >
      {props.question}
    </Text>
  );
};

