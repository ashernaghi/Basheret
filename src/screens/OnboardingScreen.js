
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, Button, Text, TouchableOpacity } from 'react-native';
import {loginWithFacebook} from '../actions/AuthActions';
import { FacebookLoginButton } from '../components/FacebookLoginButton'

export class OnboardingScreen extends React.Component {
  constructor(props){
    super(props);
  }
  // if they login successfully, the props will change, the component will update, and we can navigate to loadingapp
  componentDidUpdate(){
    if(this.props.user){
      this.props.navigation.navigate('LoadingApp');
    }
  }

  onPress(){
    this.props.dispatch(loginWithFacebook());
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.loginLogoText}>
            Basheret
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
          {this.props.loggingIn && <ActivityIndicator />}
          <FacebookLoginButton onPress={() => this.onPress()}/>
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggingIn: state.auth.loggingIn,
    loginError: state.auth.error
  };
};

//if logging in is false and error is false, then show it's logging in

export default connect(mapStateToProps)(OnboardingScreen);


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#00387e',
  justifyContent: 'center',
  padding: 10
},

loginButtonTextStyle: {
  color: '#fbfbfb',
  fontSize: 15
},

facebookLoginButton: {
  backgroundColor: '#d81159',
  padding: 20,
  alignItems: 'center',
  alignSelf: 'center',
  width: 300,
  borderRadius: 30,
},

loginLogoText: {
  color: '#fbfbfb',
}
});
