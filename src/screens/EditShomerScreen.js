import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Header} from 'react-navigation'
import OptionButton from '../components/OptionButton';
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

  generateButtons(){ //you can generate the state by storing it directly in the database not having a local state - problem is you need to also be able to delete
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
    gender: state.userInfo.user.info.gender,
    birthday: state.userInfo.user.info.birthday,
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
