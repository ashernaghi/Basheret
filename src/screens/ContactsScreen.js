import React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import {Header} from 'react-navigation'


export class ContactsScreen extends React.Component {

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#F4F4F4' }}>

  <ScrollView style={{ backgroundColor: '#F4F4F4', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'flex-end', paddingTop: 5, paddingRight: 5, }}>
              <Button
                onPress={() => this.props.navigation.goBack()}
                title="Done"
                style={{ alignSelf: 'flex-end', justifyContent:'flex-end' }}
              />
            </View>

            <View style={{ flex: 1, alignSelf: 'stretch',}}>
            <UnderlinedInput
              onChangeText={(text) => this.props.dispatch(updateUserInfo('info', 'name', text))}
              defaultValue={this.props.name}
            />
            </View>
  </ScrollView>

      </SafeAreaView>
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

export default connect(mapStateToProps)(ContactsScreen);
