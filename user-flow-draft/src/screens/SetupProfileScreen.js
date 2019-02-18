// //user sees this after filling out intro questions. Must fill out short bio, current city and state, education, high school, current job, upload profile picture. "Done" button on the bottom will only appear after they've filled out this info. After they click done it navigates to FinishedQuestions

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { userInfoUpdate } from '../actions/UserInfoActions';


export class SetupProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      gesturesEnabled: false,
    }
  };

  state = {
    profilePhoto: '',
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.props.dispatch(userInfoUpdate('profilePhoto', result.uri));
    this.props.navigation.navigate('FinishedQuestions', {answeredQuestions: true })

  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.props.dispatch(userInfoUpdate('profilePhoto', result.uri));
    this.props.navigation.navigate('FinishedQuestions', {answeredQuestions: true })
  };

  render() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Button title="Take Photo" onPress={this.useCameraHandler} />
        <Button
          title="Choose Photo"
          onPress={this.useLibraryHandler}
        />
      </ScrollView>
    );
  }
}

export default connect()(SetupProfileScreen);


const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    minHeight: 1000,
  },
  paragraph: {
    marginHorizontal: 15,
    marginTop: 30,
    fontSize: 18,
    color: '#34495e',
  },
});
