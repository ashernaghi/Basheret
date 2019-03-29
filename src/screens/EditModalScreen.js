import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';

export class EditModalScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f4' }}>

        <View style={{ flex: 1, alignSelf: 'flex-end', padding: 2}}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Done"
            style={{ alignSelf: 'flex-end', justifyContent:'flex-end' }}
          />
        </View>

        <View style={{ flex: 9, alignSelf: 'stretch',}}>
        <UnderlinedInput
          onChangeText={(text) => this.props.dispatch(updateUserInfo('info', 'name', text))}
          defaultValue={this.props.name}
        />
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

export default connect(mapStateToProps)(EditModalScreen);
