import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import {Header} from 'react-navigation'


export class ChooseNameScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  render() {
    return (
            <View style={{ flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'center' }}>

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 50, fontFamily: 'fitamint-script', color: '#00387e', }}>Basheret</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 40, paddingTop: 20, color: 'grey' }}>Enter your name:</Text>
                <UnderlinedInput
                  onChangeText={(text) => this.props.dispatch(updateUserInfo('info', 'name', text))}
                  defaultValue={this.props.name}
                  placeholder='Full Name'
                  textContentType='name'
                  returnKeyType='next'
                  autoFocus = {true}
                  onSubmitEditing={() => this.props.navigation.navigate('ChooseEmail')}
                />
              </View>

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <NextButton
                onPress={() => this.props.navigation.navigate('ChooseEmail')}
                content={this.props.name}
                >
                  <Text>Next</Text>
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
    name: state.userInfo.user.info.name,
  };
};

export default connect(mapStateToProps)(ChooseNameScreen);
