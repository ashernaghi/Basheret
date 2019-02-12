import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

export class LoadingAppScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };
  constructor(props) {
    super(props);

    //this screen will be the loading screen that is shown when we're trying to authorize the user -- if they've logged in before (not sure how we check this? token?) AND filled out the intro questions, navigate them to 'App'. If they've never logged in OR didn't fill out user info, navigate them to login screen

    //making this state temporarily. Need to check the database and see if this user answered intro questions or not
    this.state= {
      answeredQuestions: this.props.navigation.getParam('answeredQuestions', false),
    }
    setTimeout( ()=> this.checkIfUserAnsweredIntroQuestions(), 2000 );
  }

  checkIfUserAnsweredIntroQuestions(){
    if(this.state.answeredQuestions){
      this.props.navigation.navigate('App');
    }
    else if (this.props.user){
      this.props.navigation.navigate('Questions');
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
    user: state.auth.user
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
