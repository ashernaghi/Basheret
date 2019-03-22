import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import SaveButton from '../components/SaveButton';
import { NextButton } from '../components/NextButton';
import ImageActionSheet from '../components/ImageActionSheet';

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
    choosemethod: '',
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
        <Image source={{ uri: this.props.profilePhoto }} style={styles.profilePhoto}
        />
      )
    }
    else {
      return (
        <MaterialIcons
          name="account-circle"
          size={280}
          color="#9fa4ad"
        />
      )
    }
  }

  next(){
    if(this.props.profilePhoto){
      return(
         this.props.navigation.navigate('Questions')
      )

    }
  }


  render() {
    return (
      <View style={styles.containerStyle}>

        <View style={styles.photoContainerStyle}>
          {this.showImage()}
          {this.state.permissionsError && <Text>{this.state.permissionsError}</Text>}
        </View>

        <View style={styles.textContainerStyle}>
          <Text style={styles.textBoldStyle}>
            {this.props.firstName}, please upload a profile picture
          </Text>
          <Text style={styles.textLightStyle}t>
            We ask, in the hopes of the broadest possible community, that all pictures for both men and women are Tzniut
          </Text>
        </View>

          <View style={styles.buttonContainerStyle}>
            <ImageActionSheet
            style={styles.buttonStyle}
            onClick={clickedState => this.setState({choosemethod: clickedState})}
            handleCamera={this.useCameraHandler}
            handleLibrary={this.useLibraryHandler}
             />
          </View>

        {this.next()}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  containerStyle: {
    flex: 1,
  },

  photoContainerStyle: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },

  profilePhoto: {
    height: 180,
    width: 180,
    borderRadius: 90,
  },

  textContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  textBoldStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  textLightStyle: {
    fontSize: 14,
    color: '#9fa4ad',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexWrap: 'wrap'

  },

  buttonContainerStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  buttonStyle: {
    alignSelf: 'center',
    justifyContent: 'flex-start'
},

})

const mapStateToProps = state => {
  return {
    firstName: state.userInfo.user.firstName,
    profilePhoto: state.userInfo.user.profilePhoto,
  };
};

export default connect(mapStateToProps)(ChooseProfilePictureScreen);
