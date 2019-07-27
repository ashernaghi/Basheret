import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {Header} from 'react-navigation'
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { updateUserInfo } from '../actions/UserInfoActions';

export class EditShomerScreen extends Component {
  constructor(props) {
    super(props);
    this.generateButtons.bind(this);
    this.state={
      response: this.props.shomer || '',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      transitionConfig: () => fromRight(1000),
    }
  };

  generateButtons(){
      if(this.state.response==="Yes") {
        return(
        <View style={ styles.optionContainerStyle }>
          <OptionButton
            label='Yes'
            onPress={()=>this.setState({ response: 'Yes' })}
            style={styles.optionButtonStyleSelected} />
          <OptionButton
            label='No'
            onPress={()=>this.setState({ response: 'No' })}
            style={styles.optionButtonStyleUnselected} />
          <OptionButton
            label='Ideally'
            onPress={()=>this.setState({ response: 'Ideally' })}
            style={styles.optionButtonStyleUnselected} />
        </View>)
      } else if (this.state.response==="No") {
        return(
          <View style={ styles.optionContainerStyle }>
            <OptionButton
              label='Yes'
              onPress={()=>this.setState({ response: 'Yes' })}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='No'
              onPress={()=>this.setState({ response: 'No' })}
              style={styles.optionButtonStyleSelected} />
            <OptionButton
              label='Ideally'
              onPress={()=>this.setState({ response: 'Ideally' })}
              style={styles.optionButtonStyleUnselected} />
          </View>)
      } else if(this.state.response==="Ideally") {
        return(
          <View style={ styles.optionContainerStyle }>
            <OptionButton
              label='Yes'
              onPress={()=>this.setState({ response: 'Yes' })}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='No'
              onPress={()=>this.setState({ response: 'No' })}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='Ideally'
              onPress={()=>this.setState({ response: 'Ideally' })}
              style={styles.optionButtonStyleSelected} />
          </View>)
      } else {
        return(
          <View style={ styles.optionContainerStyle }>
            <OptionButton
              label='Yes'
              onPress={()=>this.setState({ response: 'Yes' })}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='No'
              onPress={()=>this.setState({ response: 'No' })}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='Ideally'
              onPress={()=>this.setState({ response: 'Ideally' })}
              style={styles.optionButtonStyleUnselected} />
          </View>)
      }
  }

  handleSave(){
    this.props.dispatch(updateUserInfo('info', 'shomer', this.state.response))
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
          <Text style={styles.questionTextStyle}>Are you Shomer?</Text>
        </View>

        {this.generateButtons()}

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
    shomer: state.userInfo.user.info.shomer,
  };
};

export default connect(mapStateToProps)(EditShomerScreen);

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
