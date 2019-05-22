import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import {Header} from 'react-navigation'


export class ChooseEmailScreen extends React.Component {
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

  render() {
    return (
            <View style={{ flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'center' }}>

              <View style={{ flex: 1, fontSize: 25, fontWeight: 'bold', }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', }}>Edit your email:</Text>
              </View>

              <View style={{ flex: 1,}}>
                <UnderlinedInput
                  onChangeText={(text) => this.props.dispatch(updateUserInfo('info', 'email', text))}
                  defaultValue={this.props.email}
                />
              </View>

              <View style={{ flex: 1 }}>
                <NextButton onPress={() => this.props.navigation.navigate('ChooseProfilePicture')}>
                <Text>Done</Text>
                </NextButton>
              </View>

            </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.userInfo.user.info.name,
  };
};

export default connect(mapStateToProps)(ChooseEmailScreen);
