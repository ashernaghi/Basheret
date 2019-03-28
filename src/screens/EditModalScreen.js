import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { Input } from 'react-native-elements';

export class EditModalScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'blue', paddingTop:50 }}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Done"
        />
        <Input
          onChangeText={(text) => this.props.dispatch(updateUserInfo('name', text, 'info'))}
          defaultValue={this.props.name}
        > 
        </Input>
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

export default connect(mapStateToProps)(EditModalScreen);