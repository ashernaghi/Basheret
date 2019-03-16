import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const FacebookLoginButton = ({ onPress }) => {
  return(
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 3}}>
        <MaterialIcons
        name="lock"
        size={12}
        color="white"
        style={{ alignSelf: 'center'}}
        />
        <Text
        style={styles.facebookSafeStyle}>
          We will never post on Facebook
        </Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.facebookLoginButtonStyle}>
          <Text style={styles.loginButtonTextStyle}>
            Login with Facebook
          </Text>
      </TouchableOpacity>
    </View>
  )
};

export { FacebookLoginButton };

const styles = StyleSheet.create({

loginButtonTextStyle: {
  color: '#fbfbfb',
  fontSize: 15,
},

facebookLoginButtonStyle: {
  backgroundColor: '#d81159',
  padding: 20,
  alignItems: 'center',
  alignSelf: 'center',
  width: 300,
  borderRadius: 30,
},

facebookSafeStyle: {
  color: '#fbfbfb',
  alignSelf: 'center',
  paddingLeft: 5,
  fontSize: 12
},
});
