import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const PhoneLoginButton = ({ onPress }) => {
  return(
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={onPress} style={styles.phoneLoginButtonStyle}>
          <Text style={styles.loginButtonTextStyle}>
            Login with Phone
          </Text>
      </TouchableOpacity>
    </View>
  )
};

export { PhoneLoginButton };

const styles = StyleSheet.create({

loginButtonTextStyle: {
  color: '#fbfbfb',
  fontSize: 15,
},

phoneLoginButtonStyle: {
  backgroundColor: '#d81159',
  padding: 20,
  alignItems: 'center',
  alignSelf: 'center',
  width: 300,
  borderRadius: 30,
},

});
