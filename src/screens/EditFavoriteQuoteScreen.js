import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/UserInfoActions';
import { Ionicons } from '@expo/vector-icons';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { NextButton } from '../components/NextButton';
import { Header } from 'react-navigation'
import styles from '../styles/editStyles';

export class EditFavoriteQuoteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      transitionConfig: () => fromRight(1000),
    }

  };

    constructor(props) {
      super(props);
      this.state = {
        response: this.props.favoriteQuote || '',
      }
    };

    handleSave(){
      this.props.dispatch(updateUserInfo('info', 'favoriteQuote', this.state.response))
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
          <Text style={styles.questionTextStyle}>Tell us your Favorite Quote:</Text>
          <UnderlinedInput
            onChangeText={(text) => this.setState({response: text})}
            value={this.state.response}
            placeholder='The nature of the dilemma can be stated in a three-word sentence. I am lonely.'
            autoFocus = {true}
            multiline={true}
            autoCorrect={true}
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
    favoriteQuote: state.userInfo.user.info.favoriteQuote,
  };
};

export default connect(mapStateToProps)(EditFavoriteQuoteScreen);
