import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Header} from 'react-navigation'
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { DisabledNextButton } from '../components/DisabledNextButton';




export class EditGenderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Basheret',
      headerStyle: {
        backgroundColor: '#f4f4f4',
        shadowColor: 'transparent',
        borderBottomColor:'transparent',
        borderBottomWidth: 0
      },
      headerTintColor: '#00387e',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'fitamint-script',
        fontSize: 30
      },
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Profile')}
          title="Done"
          style={{ alignSelf: 'flex-end', justifyContent:'flex-end' }}
        />
      ),
      headerLeft: null,
    }
  };

  constructor(props){
    super(props);
    this.state={
      selected: ''
    }
  }


  ////////
  buttonDisplay(){
    if (this.state.selected==='Female'){
      return(
      <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
        <OptionButton label='Male' onPress={()=>this.buttonSelected("Male")} style={styles.optionButtonStyleUnselected} />
        <OptionButton label='Female' onPress={()=>this.buttonSelected("Female")} style={styles.optionButtonStyleSelected} />
      </View>)
    } else if (this.state.selected==='Male') {
      return(
      <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
        <OptionButton label='Male'  onPress={()=>this.buttonSelected("Male")} style={styles.optionButtonStyleSelected} />
        <OptionButton label='Female' onPress={()=>this.buttonSelected("Female")} style={styles.optionButtonStyleUnselected} />
      </View>)
    } else {
      return(
    <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
      <OptionButton label='Male' onPress={()=>this.buttonSelected("Male")} style={styles.optionButtonStyleUnselected} />
      <OptionButton label='Female' onPress={()=>this.buttonSelected("Female")} style={styles.optionButtonStyleUnselected} />
    </View>)
    }
  }

  buttonSelected(str=""){
    this.setState({ selected: str })
    console.log(this.state.selected)

  }

  nextButton(){
    if(this.state.selected){
      return(
        <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
          <NextButton onPress={()=>this.onPress(this.state.selected)} >Next</NextButton>
        </View>
      )
    } else {
      return(
        <View style={{ flex: 1, backgroundColor: '#F4F4F4'}}>
          <DisabledNextButton>Next</DisabledNextButton>
        </View>
      )
    }
  }

  //////

  render(){
    return(
    <View style={styles.viewStyle}>

      <View>
        <Text>Edit your gender: </Text>
      </View>

      {this.buttonDisplay()}

      {this.nextButton()}

    </View>
  )
  }
}

const mapStateToProps = state => {
  return {
    denomination: state.userInfo.user.info.denomination,
    shabbatObservance: state.userInfo.user.info.shabbatObservance,
    kashrutObservance: state.userInfo.user.info.kashrutObservance,
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
    gender: state.userInfo.user.info.gender
  };
};

export default connect(mapStateToProps)(EditGenderScreen);

const styles = StyleSheet.create({
  viewStyle:{
    flex: 1,
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
