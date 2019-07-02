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
      header: null,
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
    console.log(this.props.birthday)
    return (
      <View style={{ flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'center' }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ fontSize: 50, fontFamily: 'fitamint-script', color: '#00387e', }}>Basheret</Text>
        </View>

        <View style={{ flex: 0.5 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 40, paddingTop: 20, color: 'grey' }}>Choose your Birthday:</Text>
        </View>

        <View style={{ flex: 0.5, paddingLeft: 40, }}>
          <DatePicker
                defaultDate={new Date(1995, 0, 1 )}
                minimumDate={new Date(1980, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={true}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={'Choose Date'}
                textStyle={{ color: "grey" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.handleDate}
                disabled={false}
                autoFocus={true}
                />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <NextButton
          onPress={() => this.props.navigation.navigate('Profile')}
          content={this.props.birthday}
          >
            <Text>Save</Text>
          </NextButton>
        </View>

        <View style={{ flex: 2, justifyContent: 'center'  }}>

        </View>

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
