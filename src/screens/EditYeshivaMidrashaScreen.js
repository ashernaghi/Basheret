import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import {Header} from 'react-navigation'


export class EditYeshivaMidrashaScreen extends React.Component {
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
                <Text style={{ fontSize: 25, fontWeight: 'bold', }}>Edit your Yeshiva/Midrasha:</Text>
              </View>

              <View style={{ flex: 1,}}>
                <UnderlinedInput
                  onChangeText={(text) => this.props.dispatch(updateUserInfo('info', 'yeshivamidrasha', text))}
                  defaultValue={this.props.university}
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
    yeshivamidrasha: state.userInfo.user.info.yeshivamidrasha,
  };
};

export default connect(mapStateToProps)(EditYeshivaMidrashaScreen);