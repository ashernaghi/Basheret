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
   this.state = { chosenDate: new Date() };
   this.setDate = this.setDate.bind(this);
   this.handlePress = this.handlePress.bind(this);
   this.updateAge = this.updateAge.bind(this)
   this.navigateBack = this.navigateBack.bind(this)
   this.calculateAge = this.calculateAge.bind(this)
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  updateAge(){
    this.props.dispatch(updateUserInfo('info', 'birthday', this.state.chosenDate.toString().substr(4, 12)))
  }

  navigateBack(){
    this.props.navigation.navigate('Profile')
  }

  handlePress(){
    this.updateAge();
    this.navigateBack();
  }

  calculateAge(){
    let todayDate = new Date()
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth();
    let todayDay = todayDate.getDay();
    console.log(todayDate) // 2019-05-03T06:12:07.542Z
    console.log(this.props.birthday) //Oct 31 2014
    console.log(this.state.chosenDate.getMonth()) //chosen date resets every time you refresh the state
    if(todayMonth < this.props.birthday.toString().substr(7, 12)){
      console.log(this.props.birthday.toString().substr(0, 12))
    }
    let userAge= new Date().getFullYear() - this.props.birthday.toString().substr(7, 12);





    return userAge
  }

  render() {
    return (
            <View style={{ flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'center' }}>

              <View style={{ flex: 1, fontSize: 25, fontWeight: 'bold', }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', }}>Edit your Birthday:</Text>
              </View>

              <View style={{flex: 1, backgroundColor: '#F4F4F4', flexDirection: 'column'}} >
                    <DatePicker
                      defaultDate={new Date()} //can make if statement fn that says if null use new Date but otherwise use props
                      minimumDate={new Date(1950, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Select date"
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDate}
                      disabled={false}
                      format="YYYY-MM-DD"
                      />
                      <Text>
                        Date: {this.props.birthday.toString().substr(0, 12)}
                      </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <NextButton onPress={() => this.handlePress()}>Save</NextButton>
                  <NextButton onPress={() => console.log(this.calculateAge())}>Date Tester</NextButton>
                </View>

            </View>
    );
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
  };
};

export default connect(mapStateToProps)(EditAgeScreen);
