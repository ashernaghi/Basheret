import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';


const NextButton = ({ onPress, children, content }) => {
  if(content){
    return(
        <TouchableOpacity
        onPress={onPress}
        style={styles.enabledButtonStyle}
        disabled={false}
        >
        <Text style={styles.buttonTextStyle}>
          {children}
        </Text>
        </TouchableOpacity>
      )
  } else {
    return(
      <TouchableOpacity
      style={styles.disabledButtonStyle}
      disabled={false}
      >
        <Text style={styles.buttonTextStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }

  };

export { NextButton };

const styles = StyleSheet.create ({
  enabledButtonStyle: {
    backgroundColor: '#00387e',
    borderRadius: 30,
    width: 180,
    alignSelf: 'center',
  },

  disabledButtonStyle: {
    backgroundColor: 'grey',
    borderRadius: 30,
    width: 180,
    alignSelf: 'center',
  },

  buttonTextStyle: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 16,
  },

});
