import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { updateUserInfo, uploadProfilePicture } from '../actions/UserInfoActions';
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
        // this.props.dispatch(updateUserInfo('info', 'profilePhoto', result.uri));
        this.props.dispatch(uploadProfilePicture(result))
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
        // this.props.dispatch(updateUserInfo('info', 'profilePhoto', result.uri));
        console.log('RESULT IS', result);
        this.props.dispatch(uploadProfilePicture(result))
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

  onClick(clickedState){
    this.setState({choosemethod: clickedState})
  }

  showButton(){
    if(this.props.profilePhoto){
      return(
      <NextButton
         onPress={() => this.props.navigation.navigate('Questions')}>
         Next
      </NextButton>
      )
    } else {
      return(
      <ImageActionSheet
      style={styles.buttonNextStyle}
      onClick={clickedState => this.setState({choosemethod: clickedState})}
      handleCamera={this.useCameraHandler}
      handleLibrary={this.useLibraryHandler}
      text='Choose Photo'
      textstyle={styles.buttonNextTextStyle}
       />
     )
    }
  }


    showEdit(){
      if(this.props.profilePhoto){
        return(
          <View style={{ paddingTop: 20}}>
          <ImageActionSheet
          onClick={clickedState => this.setState({choosemethod: clickedState})}
          handleCamera={this.useCameraHandler}
          handleLibrary={this.useLibraryHandler}
          text='Edit'
          style={styles.buttonEditStyle}
          textstyle={styles.buttonEditTextStyle}
          icon={<MaterialIcons
                    name="edit"
                    size={18}
                    color="black"
                    style={styles.editPenStyle}
                  />}
          />
          </View>
        )
      } else {
        return(
          <View>
          <Text style={styles.textBoldStyle}>
            {this.props.name}, please upload a profile picture
          </Text>
          <Text style={styles.textLightStyle}>
            We ask, in the hopes of the broadest possible community, that all pictures for both men and women are Tzniut
          </Text>
          </View>
       )
      }
    };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewSyle}>
      <View style={styles.containerStyle}>
        <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, alignSelf: 'center', color: '#00387e'}}>Basheret</Text>
        <View style={styles.photoContainerStyle}>
          {this.showImage()}
          {this.state.permissionsError && <Text>{this.state.permissionsError}</Text>}
        </View>

        <View style={styles.textContainerStyle}>

          {this.showEdit()}
        </View>

          <View style={styles.buttonContainerStyle}>
            {this.showButton()}

          </View>


      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  safeAreaViewSyle:{
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  containerStyle: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  photoContainerStyle: {
    flex: 3,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },

  profilePhoto: {
    height: 240,
    width: 240,
    borderRadius: 120,
    paddingBottom: 20
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
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  buttonNextStyle: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#00387e',
    width: 300,
    borderRadius: 30,

},
  buttonNextTextStyle: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    padding: 18,
},

  buttonEditStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 30,

  },
  buttonEditTextStyle: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: 5,
    paddingTop: 7,
    paddingBottom: 7,
  },

  editPenStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  }
})

const mapStateToProps = state => {
  console.log('STATE IS:', state.userInfo)
  return {
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
  };
};

export default connect(mapStateToProps)(ChooseProfilePictureScreen);
