import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { Container, Content, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import {Header} from 'react-navigation'


export class EditAboutMeScreen extends React.Component {
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

  constructor(props) {
   super(props);
   this.state = {};
  }

  render() {
    return (
            <View style={{ flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'center' }}>

              <View style={{ flex: 1, fontSize: 25, fontWeight: 'bold', }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', }}>Tell us about yourself:</Text>
              </View>

              <View style={{ flex: 1,}}>
                <UnderlinedInput
                  onChangeText={(text) => this.props.dispatch(updateUserInfo('info', 'aboutMe', text))}
                  defaultValue={this.props.aboutMe}
                />
              </View>

              <View style={{ flex: 1 }}>
                <NextButton onPress={() => this.props.navigation.navigate('Profile')}>
                <Text>Done</Text>
                </NextButton>
              </View>


            </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    aboutMe: state.userInfo.user.info.aboutMe,
  };
};

export default connect(mapStateToProps)(EditAboutMeScreen);
