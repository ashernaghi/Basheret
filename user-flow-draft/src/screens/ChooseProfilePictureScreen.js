// //user sees this after filling out intro questions. Must fill out short bio, current city and state, education, high school, current job, upload profile picture. "Done" button on the bottom will only appear after they've filled out this info. After they click done it navigates to FinishedQuestions

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { userInfoUpdate } from '../actions/UserInfoActions';
import styles from '../styles/styles';

export class ChooseProfilePictureScreen extends Component {
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
    if(!result.cancelled){
      this.props.dispatch(userInfoUpdate('profilePhoto', result.uri));
      this.props.navigation.navigate('Questions', {answeredQuestions: true })
    }
  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    if(!result.cancelled){
      this.props.dispatch(userInfoUpdate('profilePhoto', result.uri));
      this.props.navigation.navigate('Questions', {answeredQuestions: true })
    }
  };

  render() {
    return (
      <View style={styles.columnContainer}>
        <MaterialIcons 
          name="account-circle" 
          size={250} 
          color="gray"
        />
        <Text>
          {this.props.firstName}, Please Upload A Profile Picture
        </Text>
        <View style={styles.container}>
          <View>
            <FontAwesome 
                name="camera" 
                size={150} 
                color="black"
                onPress={this.useCameraHandler}
            />
            <Text>Take Photo</Text>
          </View>
          <View>
            <MaterialIcons 
              name="photo-library" 
              size={150} 
              color="black"
              onPress={this.useLibraryHandler}
            />
            <Text>Choose Photo</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.userInfo.firstName,
  };
};

export default connect(mapStateToProps)(ChooseProfilePictureScreen);