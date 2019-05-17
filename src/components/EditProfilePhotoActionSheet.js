import React, { Component } from "react";
import { View, TouchableOpacity, Text, ImageBackground  } from 'react-native';
import { ActionSheet } from "native-base";
import { NextButton } from './NextButton';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';



var BUTTONS = ['Camera', 'Photo Gallery', 'Cancel'];
var CANCEL_INDEX = 3;

export class EditProfilePhotoActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChosenMethod() {
    const clickedState = this.state.clicked
    this.props.onClick(clickedState);
  }

  photoOrAlbum() {
    if (this.state.clicked==='Camera'){
      return(
        this.props.handleCamera()
      )
    } if (this.state.clicked==='Photo Gallery')
      return(
        this.props.handleLibrary()
      )
  }

  render() {
    return (
          <TouchableOpacity
            style={this.props.style}
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: 'Choose an Option'
              },
              buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex]});
                this.onChosenMethod()
                this.photoOrAlbum()
              },
            )
          }>
            <ImageBackground
              source={{ uri: this.props.profilePhoto }}
              style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={{ marginLeft: 30, fontSize: 20, color: 'white', fontWeight: 'bold', paddingBottom: 40, textShadowColor: 'grey', textShadowOffset: { width: -1, height: 0 },textShadowRadius: 0.5,}} >{this.props.name}</Text>
            </ImageBackground>

          </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  console.log('STATE IS:', state.userInfo)
  return {
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
  };
};

export default connect(mapStateToProps)(EditProfilePhotoActionSheet);
