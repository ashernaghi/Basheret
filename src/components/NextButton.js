import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NextButton = ({ onPress, children }) => {
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

export { NextButton };

const styles = StyleSheet.create ({
  buttonStyle: {
    backgroundColor: '#00387e',
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
