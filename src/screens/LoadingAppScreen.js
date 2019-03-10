import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, Text, StyleSheet, Platform } from 'react-native';
import { updateUserInfo } from '../actions/UserInfoActions';
import { Location, Permissions } from 'expo';

export class LoadingAppScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

    //this screen will be the loading screen that is shown when we're trying to authorize the user -- if they've logged in before (not sure how we check this? token?) AND filled out the intro questions, navigate them to 'App'. If they've never logged in OR didn't finish filling out user info, navigate them to login screen

    //making this temporarily. Need to check the database and see if this user answered intro questions or not
    state={
      answeredQuestions: this.props.navigation.getParam('answeredQuestions', false),
    }

    componentDidMount(){
      this.checkIfUserAnsweredIntroQuestions();
    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.props.dispatch(updateUserInfo('location', null));
      }
      else{
        let location = await Location.getCurrentPositionAsync({});
        this.props.dispatch(updateUserInfo('location', location.coords));
      }
      setTimeout( ()=> this.props.navigation.navigate('App'), 2000 );
    };
  

  checkIfUserAnsweredIntroQuestions(){
    if(this.state.answeredQuestions){
      //check if user answered intro questions, grab it from db, save it to state
      this._getLocationAsync();
    }
    else if (this.props.user){
      this.props.navigation.navigate('IntroQuestions');
    }
    else{
      this.props.navigation.navigate('Onboarding');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Loading Screen With Logo (check database if user answered intro questions, show this before going to app)</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    location: state.userInfo.location,
  };
};

export default connect(mapStateToProps)(LoadingAppScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
