import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
    <View style={styles.containerStyle}>

      <View style={styles.headerContainerStyle}>
        <View style={ styles.backArrowStyle }>
          <Ionicons
            name="ios-arrow-back"
            size={27}
            color="grey"
            onPress={() => this.props.navigation.navigate('Profile')}
          />
        </View>
        <View style={styles.logoContainerStyle}>
          <Text style={styles.logoFontStyle}>Basheret</Text>
        </View>
      </View>

      <View style={styles.questionContainerStyle}>
        <Text style={styles.questionTextStyle}>Edit your Gender:</Text>
      </View>

      {this.buttonDisplay()}

      <View style={styles.buttonContainerStyle}>
        <NextButton
        onPress={() => this.handleSave()}
        content='enabled'
        >
          <Text>Save</Text>
        </NextButton>
      </View>

      <View style={styles.emptySpaceContainerStyle}/>
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

  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
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

  logoContainerStyle:{
    alignSelf: 'center',
    alignItems:'center',
    justifyContent: 'center',
    marginRight: 90,
    marginLeft: 90, },

  logoFontStyle: {
    fontSize: 50,
    fontFamily: 'fitamint-script',
    color: '#00387e',
  },

  headerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  backArrowStyle:{
    alignSelf: 'center',
    justifySelf:'flex-start',
  },

  questionContainerStyle: {
    flex: 0.5,
  },

  questionTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingTop: 20,
    color: 'grey'
  },

  buttonContainerStyle: {
    flex: 0.5,
    justifyContent: 'center',
  },

  emptySpaceContainerStyle: {
    flex: 1,
  },
})
