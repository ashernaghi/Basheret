import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, Button, Text, TouchableOpacity } from 'react-native';
import {loginWithFacebook} from '../actions/AuthActions';
import { PhoneLoginButton } from '../components/PhoneLoginButton'
import { Font } from 'expo'
import firebase from '../actions/firebase'
import { loginWithPhoneNumber } from '../actions/AuthActions'


export class InitialLoadingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };
  constructor(props){
    super(props);
    firebase.auth().onAuthStateChanged(user => {
        this.setState({user})
    })
  }
  // if they login successfully, the props will change, the component will update, and we can navigate to loadingapp


componentDidUpdate(){
  if(this.state.user){
      this.props.dispatch(loginWithPhoneNumber(this.state.user));
      this.props.navigation.navigate('LandingScreen');
      console.log(this.state.user)
    } else{
      this.props.navigation.navigate('OnboardingStack');
  }
}

  render() {
    return(
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
       />
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

export default connect(mapStateToProps)(InitialLoadingScreen);


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
  fontFamily: 'fitamint-script',
  fontSize: 90
}
});
