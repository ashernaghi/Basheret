import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchSelector from "react-native-switch-selector";
import ChatScreen from './ChatScreen';
import MatchesScreen from './MatchesScreen';
import styles from '../styles/styles';
import {showProfileScreen} from '../actions/UserInfoActions';

export class SocialScreen extends React.Component {
  constructor(props){
    super(props)

    this.state={
      show: "matches",
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity style={ styles.touchableOpacityHeader } onPress={() => navigation.navigate('Home')}>
          <Ionicons
            name="ios-arrow-back"
            size={32}
            color="black"
            style={styles.headerIcons}
          />
          <Text style={ styles.headerText } >
            Home
          </Text>
        </TouchableOpacity>
      ),
    }
  };

  render() {
    let renderComponent;
    if(this.state.show==='matches'){
      renderComponent = <MatchesScreen
        navigate={(card)=> {
          console.log('HERE IN NAV')
          this.props.dispatch(showProfileScreen('match', card));
          this.props.navigation.navigate('CandidateModal')}
        }
      />
    }
    else{
      renderComponent = <ChatScreen/>
    }

    return (
      <View style={{flex: 1, alignItems: 'center' }}>
        <SwitchSelector
          initial={0}
          imageStyle={{justifyContent: 'center', alignItems: 'center'}}
          onPress={value => this.setState({show: value})}
          buttonColor='#7ca6ea'
          height={50}
          borderRadius='0'
          options={[
            { value: "matches", label: 'Matches' },
            { value: "chats", label: 'Chats'  },
          ]}
        />
        {renderComponent}
      </View>
    );
  }
}

export default connect()(SocialScreen);
