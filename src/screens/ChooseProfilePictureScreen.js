import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableHighlight } from 'react-native';
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
      // this.props.navigation.navigate('Questions', {answeredQuestions: true })
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
    }
  };

  showImage(){
    if(this.props.profilePhoto){
      return (
        <Image source={{ uri: this.props.profilePhoto }} style={styles.profilePhoto} />
      )
    }
    else {
      return (
        <MaterialIcons 
          name="account-circle" 
          size={230} 
          color="gray"
        />
      )
    }
  }

  next(){
    if(this.props.profilePhoto){
      return(
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Questions', {answeredQuestions: true })}
        >
          <Text>Looks Good!</Text>
        </TouchableHighlight>
      )
      
    }
  }

  render() {
    return (
      <View style={styles.chooseProfPicContainer}>
        {this.showImage()}
        
        <Text>
          {this.props.firstName}, Please Upload A Profile Picture
        </Text>

        <View style={styles.uploadPhotoOptionsContainer}>
          <View style={styles.uploadIcon}>
            <FontAwesome 
                name="camera" 
                size={100} 
                color="black"
                onPress={this.useCameraHandler}
            />
            <Text style={{textAlign:'center'}}>Take</Text>
          </View>
          <View style={styles.uploadIcon}>
            <MaterialIcons 
              name="photo-library" 
              size={100} 
              color="black"
              onPress={this.useLibraryHandler}
            />
            <Text style={{textAlign:'center'}}>Choose</Text>
          </View>
        </View>

        {this.next()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.userInfo.firstName,
    profilePhoto: state.userInfo.profilePhoto,
  };
};

export default connect(mapStateToProps)(ChooseProfilePictureScreen);