import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Header} from 'react-navigation'
import OptionButton from '../components/OptionButton';
import { NextButton } from '../components/NextButton';
import { updateUserInfo } from '../actions/UserInfoActions';


export class EditShomerScreen extends Component {
  constructor(props) {
    super(props);
    this.generateButtons.bind(this)
  }

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
      headerRight: null,
      headerLeft: null,
    }
  };

  generateButtons(){
      if(this.props.shomer==="Yes") {
        return(
        <View style={{ flex: 1 }}>
          <OptionButton
            label='Yes'
            onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Yes'))}
            style={styles.optionButtonStyleSelected} />
          <OptionButton
            label='No'
            onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'No'))}
            style={styles.optionButtonStyleUnselected} />
          <OptionButton
            label='Ideally'
            onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Ideally'))}
            style={styles.optionButtonStyleUnselected} />
        </View>)
      } else if (this.props.shomer==="No") {
        return(
          <View style={{ flex: 1 }}>
            <OptionButton
              label='Yes'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Yes'))}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='No'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'No'))}
              style={styles.optionButtonStyleSelected} />
            <OptionButton
              label='Ideally'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Ideally'))}
              style={styles.optionButtonStyleUnselected} />
          </View>)
      } else if(this.props.shomer==="Ideally") {
        return(
          <View style={{ flex: 1 }}>
            <OptionButton
              label='Yes'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Yes'))}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='No'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'No'))}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='Ideally'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Ideally'))}
              style={styles.optionButtonStyleSelected} />
          </View>)
      } else {
        return(
          <View style={{ flex: 1 }}>
            <OptionButton
              label='Yes'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Yes'))}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='No'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'No'))}
              style={styles.optionButtonStyleUnselected} />
            <OptionButton
              label='Ideally'
              onPress={()=>this.props.dispatch(updateUserInfo('info', 'shomer', 'Ideally'))}
              style={styles.optionButtonStyleUnselected} />
          </View>)
      }
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#F4F4F4'}}>
        {this.generateButtons()}

        <View style={{ flex: 1 }}>
          <NextButton onPress={() => this.props.navigation.navigate('Profile')}>
          <Text>Done</Text>
          </NextButton>
        </View>

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
  safeAreaViewSyle:{
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
})
