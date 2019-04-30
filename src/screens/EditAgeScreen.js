import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { Container, Content, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
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
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
      () => this.props.dispatch(updateUserInfo('info', 'birthday', this.state.chosenDate.toString().substr(4, 12)))
  }

  updateAge(){
    () => this.props.dispatch(updateUserInfo('info', 'birthday', this.state.chosenDate.toString().substr(4, 12)))
  }

  navigateBack(){
    () => this.props.navigation.navigate('Profile')
  }
  handlePress(){
    this.updateAge();
    this.navigateBack();
  }

  render() {
    return (
            <View style={{ flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'center' }}>

              <View style={{ flex: 1, fontSize: 25, fontWeight: 'bold', }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', }}>Edit your Birthday:</Text>
              </View>

              <View style={{flex: 1, backgroundColor: '#F4F4F4', flexDirection: 'row'}} >
                    <DatePicker
                      defaultDate={new Date(2018, 4, 4)}
                      minimumDate={new Date(2018, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={true}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Select date"
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDate}
                      disabled={false}
                      />
                      <Text>
                        Date: {this.state.chosenDate.toString().substr(4, 12)}
                      </Text>
                      <TouchableOpacity
                      style={{backgroundColor: 'blue'}}
                      onPress={() => this.handlePress()}>
                        <Text>Click</Text>
                      </TouchableOpacity>
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
    gender: state.userInfo.user.info.gender
  };
};

export default connect(mapStateToProps)(EditAgeScreen);
