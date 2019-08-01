import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, Text, StyleSheet, Platform } from 'react-native';
import { getUser } from '../actions/UserInfoActions';

export class LoadingAppScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

    //this screen will be the loading screen that is shown when we're trying to authorize the user -- if they've logged in before (not sure how we check this? token?) AND filled out the intro questions, navigate them to 'App'. If they've never logged in OR didn't finish filling out user info, navigate them to login screen

  componentDidMount(){
    this.props.dispatch(getUser(this.props));
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userInfo: state.userInfo.user,
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
