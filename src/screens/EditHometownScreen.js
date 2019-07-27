import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import { Header } from 'react-navigation'
import styles from '../styles/editStyles';


export class EditHometownScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      transitionConfig: () => fromLeft(1000),
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      response: this.props.hometown || '',
    }
  };

  handleSave(){
    this.props.dispatch(updateUserInfo('info', 'hometown', this.state.response))
    this.props.navigation.navigate('Profile');
  }

  render() {
    return (
      <View style={styles.containerStyle}>

        <View style={styles.headerContainerStyle}>
          <View style={ styles.backArrowStyle }>
            <Ionicons
              name="ios-arrow-back"
              size={27}
              color="grey"
              onPress={() => this.props.navigation.navigate('Profile')}
            />
          </View>
          <View style={styles.logoContainerStyle}>
            <Text style={styles.logoFontStyle}>Basheret</Text>
          </View>
        </View>

        <View style={styles.questionContainerStyle}>
          <Text style={styles.questionTextStyle}>Edit your Hometown:</Text>
          <UnderlinedInput
            onChangeText={(text) => this.setState({response: text})}
            value={this.state.response}
            placeholder='Where are you from?'
            returnKeyType='done'
            autoFocus = {true}
            onSubmitEditing={() => this.handleSave()}
          />
        </View>

        <View style={styles.buttonContainerStyle}>
          <NextButton
          onPress={() => this.handleSave()}
          content='enabled'
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
    hometown: state.userInfo.user.info.hometown,
  };
};

export default connect(mapStateToProps)(EditHometownScreen);
