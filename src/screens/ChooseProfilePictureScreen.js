import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
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
    permissionsError: null,
    cameraRollPermissions: null,
    cameraPermissions: null,
  };

  askCameraPermissionsAsync = async () => {
    let cameraPermission = await Permissions.askAsync(Permissions.CAMERA);

    console.log(cameraPermission);

    if(cameraPermission.status==="denied"){
      console.log('1');
      this.setState({permissionsError: 'Oops! Looks like you haven\'t granted Basheret permission to your Camera. Please go into your settings and change that so you can take a picture for your profile!'});
    }
    else{
      console.log('2')
      this.setState({permissionsError: null, cameraPermissions: true})
    }
  };

  askCameraRollPermissionsAsync = async () => {
    let cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(cameraRollPermission.status==="denied"){
      console.log('1');
      this.setState({permissionsError: 'Oops! Looks like you haven\'t granted Basheret permission to your Camera Roll. Please go into your settings and change that so you can upload a picture for your profile!'});
    }
    else{
      console.log('2');
      this.setState({permissionsError: null, cameraRollPermissions: true})
    }
  };

  useLibraryHandler = async () => {
    await this.askCameraRollPermissionsAsync();
    if(this.state.cameraRollPermissions){
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
      });
      if(!result.cancelled){
        this.props.dispatch(updateUserInfo('profilePhoto', result.uri));
      }
    }
  };

  useCameraHandler = async () => {
    let x = await this.askCameraPermissionsAsync();
    console.log('x', x);
    if(this.state.cameraPermissions){
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
      });
      if(!result.cancelled){
        this.props.dispatch(updateUserInfo('profilePhoto', result.uri));
      }
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
          onPress={() => this.props.navigation.navigate('Questions')}
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

        {this.state.permissionsError && <Text>{this.state.permissionsError}</Text>}

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
    firstName: state.userInfo.user.firstName,
    profilePhoto: state.userInfo.user.profilePhoto,
  };
};

export default connect(mapStateToProps)(ChooseProfilePictureScreen);