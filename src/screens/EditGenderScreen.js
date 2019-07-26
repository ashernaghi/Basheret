import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Header} from 'react-navigation'
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { DisabledNextButton } from '../components/DisabledNextButton';
import { updateUserInfo } from '../actions/UserInfoActions';


export class EditGenderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      transitionConfig: () => fromLeft(1000),
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      response: this.props.gender || '',
    }
  };


  buttonDisplay(){
    if (this.state.response==='Female'){
      return(
      <View style={ styles.optionContainerStyle }>
        <OptionButton label='Male' onPress={()=>this.setState({ response: 'Male'})} style={styles.optionButtonStyleUnselected} />
        <OptionButton label='Female' onPress={()=>this.setState({ response: 'Female'})} style={styles.optionButtonStyleSelected} />
      </View>)
    } else if (this.state.response==='Male') {
      return(
      <View style={ styles.optionContainerStyle }>
        <OptionButton label='Male'  onPress={()=>this.setState({ response: 'Male'})} style={styles.optionButtonStyleSelected} />
        <OptionButton label='Female' onPress={()=>this.setState({ response: 'Female'})} style={styles.optionButtonStyleUnselected} />
      </View>)
    } else {
      return(
    <View style={ styles.optionContainerStyle }>
      <OptionButton label='Male' onPress={()=>this.setState({ response: 'Male'})} style={styles.optionButtonStyleUnselected} />
      <OptionButton label='Female' onPress={()=>this.setState({ response: 'Female'})} style={styles.optionButtonStyleUnselected} />
    </View>)
    }
  }

  handleSave(){
    this.props.dispatch(updateUserInfo('info', 'gender', this.state.response))
    this.props.navigation.navigate('Profile');
  }

  render(){
    return(
    <View style={styles.viewStyle}>

      <View style={styles.logoContainerStyle}>
        <Text style={styles.logoFontStyle}>Basheret</Text>
      </View>

      <View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 40, paddingTop: 20, color: 'grey' }}>Edit your gender: </Text>
      </View>

      {this.buttonDisplay()}

      <View style={{ flex: 1 }}>
        <NextButton
        onPress={() => this.handleSave()}
        content='enabled'
        >
          <Text>Done</Text>
        </NextButton>
      </View>

    </View>
  )
  }
}

const mapStateToProps = state => {
  return {
    gender: state.userInfo.user.info.gender
  };
};

export default connect(mapStateToProps)(EditGenderScreen);

const styles = StyleSheet.create({
  viewStyle:{
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  logoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoFontStyle: {
    fontSize: 50,
    fontFamily: 'fitamint-script',
    color: '#00387e',
  },

  questionView: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },

  question: {
    fontSize: 20,
    paddingLeft: 30,
    fontWeight: 'bold'
  },

  optionContainerStyle:{
    flex: 2,
    justifyContent: 'center',
  },

  optionButtonStyleUnselected:{
    borderRadius: 30,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 7,
  },

  optionButtonStyleSelected:{
    borderRadius: 30,
    borderColor: '#00387e',
    borderWidth: 2,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 7,
  },


  sliderLabels: {
    justifyContent: 'space-between',
    height: 300,
  },

  verticalSlider: {
      height: 300,
  },


})
