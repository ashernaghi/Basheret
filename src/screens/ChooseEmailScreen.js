import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import { Header } from 'react-navigation'


export class ChooseEmailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      response: this.props.email || '',
    }
  };

  handleSave(){
    this.props.dispatch(updateUserInfo('info', 'email', this.state.response))
    this.props.navigation.navigate('ChooseProfilePicture');
  }

  render() {
    return (
            <View style={{ flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'center' }}>

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 50, fontFamily: 'fitamint-script', color: '#00387e', }}>Basheret</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 40, paddingTop: 20, color: 'grey' }}>Enter your email:</Text>

                <UnderlinedInput
                  onChangeText={(text) => this.setState({response: text})}
                  value={this.state.response}
                  autoCapitalize='none'
                  placeholder='Email Address'
                  textContentType='email'
                  returnKeyType='next'
                  autoFocus = {true}
                  onSubmitEditing={() => this.handleSave()}
                />
              </View>

              <View style={{ flex: 1, justifyContent: 'center'  }}>
                <NextButton
                onPress={() => this.handleSave()}
                content={this.state.response}
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
    email: state.userInfo.user.info.email,
  };
};

export default connect(mapStateToProps)(ChooseEmailScreen);
