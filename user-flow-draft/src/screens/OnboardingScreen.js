import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import {loginWithFacebook} from '../actions/AuthActions';

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
        <Button
            title="Login With Facebook"
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.onPress()}
            >
          </Button>
          {this.props.loggingIn && <ActivityIndicator />}
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
  backgroundColor: '#fff',
  justifyContent: 'center',
  padding: 10
},

textStyle: {
  color: 'red',
  fontSize: 30
},

});