import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 18,
    lineHeight: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
  },

  containerStyle: {
    height: 40,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingRight: 85,
    paddingLeft: 40,
    paddingTop: 15

  }
};

export { Input };
