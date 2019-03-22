import React, { Component } from "react";
import { View } from 'react-native';
import { ActionSheet } from "native-base";
import { NextButton } from './NextButton';

var BUTTONS = ['Camera', 'Photo Gallery', 'Cancel'];
var CANCEL_INDEX = 3;

export default class ImageActionSheet extends Component {
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
      <View>
          <NextButton
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

            )}
          >
            Choose Photo
          </NextButton>
      </View>
    );
  }
}
