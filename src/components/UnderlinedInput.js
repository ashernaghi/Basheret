import React from 'react';
import { TextInput, View, Text } from 'react-native';

const UnderlinedInput = ({ label, value, onChangeText, placeholder, secureTextEntry, defaultValue }) => {
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
        defaultValue={defaultValue}
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
    paddingRight: 50,
    paddingLeft: 40,
    paddingTop: 15

  }
};

export { UnderlinedInput };
