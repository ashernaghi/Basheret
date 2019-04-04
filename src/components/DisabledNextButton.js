import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';

const DisabledNextButton = ({ onPress, children }) => {
  return(
      <TouchableOpacity
      onPress={onPress}
      style={styles.buttonStyle}
      disabled={false}
      >
      <Text style={styles.buttonTextStyle}>
        {children}
      </Text>
      </TouchableOpacity>
    )
  };

export { DisabledNextButton };

const styles = StyleSheet.create ({
  buttonStyle: {
    backgroundColor: 'grey',
    borderRadius: 30,
    width: 300,
    alignSelf: 'center',


  },

  buttonTextStyle: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    padding: 18,
  },

});
