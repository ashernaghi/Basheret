import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {Header} from 'react-navigation'
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { DisabledNextButton } from '../components/DisabledNextButton';
import { updateUserInfo } from '../actions/UserInfoActions';


export class EditEthnicityScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      transitionConfig: () => fromLeft(1000),
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      response: this.props.ethnicity || '',
    }
  };


  buttonDisplay(){
    if (this.state.response==='Sephardi'){
      return(
      <View style={ styles.optionContainerStyle }>
        <OptionButton label='Sephardi' onPress={()=>this.setState({ response: 'Sephardi'})} style={styles.optionButtonStyleSelected} />
        <OptionButton label='Ashkenazi' onPress={()=>this.setState({ response: 'Ashkenazi'})} style={styles.optionButtonStyleUnselected} />
        <OptionButton label='Other' onPress={()=>this.setState({ response: 'Other'})} style={styles.optionButtonStyleUnselected} />
      </View>)
    } else if (this.state.response==='Ashkenazi') {
      return(
      <View style={ styles.optionContainerStyle }>
        <OptionButton label='Sephardi' onPress={()=>this.setState({ response: 'Sephardi'})} style={styles.optionButtonStyleUnselected} />
        <OptionButton label='Ashkenazi'  onPress={()=>this.setState({ response: 'Ashkenazi'})} style={styles.optionButtonStyleSelected} />
        <OptionButton label='Other' onPress={()=>this.setState({ response: 'Other'})} style={styles.optionButtonStyleUnselected} />
      </View>)
    } else if (this.state.response==='Other') {
      return(
      <View style={ styles.optionContainerStyle }>
        <OptionButton label='Sephardi' onPress={()=>this.setState({ response: 'Sephardi'})} style={styles.optionButtonStyleUnselected} />
        <OptionButton label='Ashkenazi' onPress={()=>this.setState({ response: 'Ashkenazi'})} style={styles.optionButtonStyleUnselected} />
        <OptionButton label='Other'  onPress={()=>this.setState({ response: 'Other'})} style={styles.optionButtonStyleSelected} />
      </View>)
    } else {
      return(
    <View style={ styles.optionContainerStyle }>
      <OptionButton label='Sephardi' onPress={()=>this.setState({ response: 'Sephardi'})} style={styles.optionButtonStyleUnselected} />
      <OptionButton label='Ashkenazi' onPress={()=>this.setState({ response: 'Ashkenazi'})} style={styles.optionButtonStyleUnselected} />
      <OptionButton label='Other' onPress={()=>this.setState({ response: 'Other'})} style={styles.optionButtonStyleUnselected} />
    </View>)
    }
  }

  handleSave(){
    this.props.dispatch(updateUserInfo('info', 'ethnicity', this.state.response))
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
        <Text style={styles.questionTextStyle}>Edit your Ethnicity:</Text>
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
    ethnicity: state.userInfo.user.info.ethnicity
  };
};

export default connect(mapStateToProps)(EditEthnicityScreen);

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
