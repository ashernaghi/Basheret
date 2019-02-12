import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import {loginWithFacebook} from '../actions/AuthActions';
import { connect } from 'react-redux';
// import { Container, Content, Header, Item, Form, Input, Button, Label} from 'native-base';

export class OnboardingScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      //need this so activity spinner shows after successful login, right before it navigated to LoadingApp
      loggingIn: false,
    }
  }
  // if they login successfully, the props will change, the componenet will update, and we can navigate to loadingapp
  componentDidUpdate(){
    if(this.props.user){
      this.props.navigation.navigate('LoadingApp');
    }
  }

  onPress(){
    this.setState({loggingIn: true});
    this.props.dispatch(loginWithFacebook());
  }

  render() {
    console.log('LOGGING IN IS', this.props.loggingIn);
    return (
      <View style={styles.container}>
        <Button
            title="Login With Facebook"
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.onPress()}
            >
          </Button>
          {this.state.loggingIn && <ActivityIndicator />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(OnboardingScreen);


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
  padding: 10
},

textStyle: {
  color: 'red',
  fontSize: 30
},

});