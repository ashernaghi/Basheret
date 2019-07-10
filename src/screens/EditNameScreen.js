import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import { Header } from 'react-navigation'


export class EditNameScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      transitionConfig: () => fromRight(1000),
    }

  };



  render() {
    return (
      <View style={styles.containerStyle}>

        <View style={styles.logoContainerStyle}>
          <Text style={styles.logoFontStyle}>Basheret</Text>
        </View>

        <View style={styles.questionContainerStyle}>
          <Text style={styles.questionTextStyle}>Edit your name:</Text>
          <UnderlinedInput
            onChangeText={(text) => this.props.dispatch(updateUserInfo('info', 'name', text))}
            defaultValue={this.props.name}
            placeholder='Full Name'
            textContentType='name'
            returnKeyType='next'
            autoFocus = {true}
            onSubmitEditing={() => this.props.navigation.navigate('Profile')}
          />
        </View>

        <View style={styles.buttonContainerStyle}>
          <NextButton
          onPress={() => this.props.navigation.navigate('Profile')}
          content={this.props.name}
          >
            <Text>Save</Text>
          </NextButton>
        </View>

        <View style={styles.emptySpaceContainerStyle}>
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

export default connect(mapStateToProps)(EditNameScreen);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },

  logoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoFontStyle: {
    fontSize: 50,
    fontFamily: 'fitamint-script',
    color: '#00387e',
  },

  questionContainerStyle: {
    flex: 1,
  },

  questionTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingTop: 20,
    color: 'grey'
  },

  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },

  emptySpaceContainerStyle: {
    flex: 2,
  },
});
