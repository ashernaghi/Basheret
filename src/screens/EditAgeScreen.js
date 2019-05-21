import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { Container, Content, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import {Header} from 'react-navigation'


export class EditAgeScreen extends React.Component {
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

  constructor(props) {
   super(props);
   this.setDate = this.setDate.bind(this);
   this.calculateAge =this.calculateAge.bind(this)
   this.handleDate = this.handleDate.bind(this)
  }

   async handleDate(newDate){
    await this.setDate(newDate);
    this.calculateAge(newDate);
  }

  setDate(newDate) {
    this.props.dispatch(updateUserInfo('info', 'birthday', newDate ))
  }

  calculateAge(newDate) {
    var todayFull = new Date()
    var todayDate = todayFull.getDate()
    var todayMonth = todayFull.getMonth()
    var todayFullYear = todayFull.getFullYear()

    var birthdayFull = new Date(newDate) // MUST BE A String
    var birthdayDate = birthdayFull.getDate()
    var birthdayMonth = birthdayFull.getMonth()
    var birthdayFullYear = birthdayFull.getFullYear()

    console.log(todayDate, todayMonth, todayFullYear)
    console.log(birthdayDate, birthdayMonth, birthdayFullYear)

    if(todayMonth > birthdayMonth){
        var age = todayFullYear - birthdayFullYear
      console.log(age)
    }
    else if(todayMonth < birthdayMonth){
      var age = todayFullYear - birthdayFullYear - 1
      console.log(age)
    }
    else if(todayMonth === birthdayMonth){

        if(todayDate > birthdayDate){
          var age = todayFullYear - birthdayFullYear
          console.log(age)
        }
        else if(todayDate < birthdayDate){
          var age = todayFullYear - birthdayFullYear - 1
          console.log(age)
        }
        else if (todayDate === birthdayDate){
          var age = todayFullYear - birthdayFullYear
          console.log(age)
        }
      }
      this.props.dispatch(updateUserInfo('info', 'age', age ))
  }

  navigateBack(){
    this.props.navigation.navigate('Profile')

  }

  render() {
    return (
      <View>
        <DatePicker
              defaultDate={new Date(this.props.birthday)}
              minimumDate={new Date(1980, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={true}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText='Birthday'
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.handleDate}
              disabled={false}
              />
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    birthday: state.userInfo.user.info.birthday,
    age: state.userInfo.user.info.age,
  };
};

export default connect(mapStateToProps)(EditAgeScreen);
