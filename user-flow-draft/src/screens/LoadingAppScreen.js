import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class LoadingAppScreen extends React.Component {
  constructor(props) {
    super(props);

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
    else{
      this.props.navigation.navigate('IntroQuestions');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
