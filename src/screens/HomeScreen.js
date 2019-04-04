import React from 'react';
import { connect } from 'react-redux';
import { View, Text, } from 'react-native';
import CandidatesScreen from './CandidatesScreen';
import MatchmakerScreen from './MatchmakerScreen';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import SwitchSelector from "react-native-switch-selector";
import styles from '../styles/styles';
import {addMatch, removeMatch, getMatches} from '../actions/matchActions';

export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Basheret',
      headerStyle: {
        backgroundColor: '#fbfbfb',
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
      headerLeft: (
        <Ionicons
          onPress={() => navigation.navigate('Profile')}
          name="ios-contact"
          size={32}
          color="grey"
          style={ styles.headerIcons }
        />
      ),
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate('Social')}
          name="ios-chatbubbles"
          size={32}
          color="grey"
          style={ styles.headerIcons }
        />
      )
    }
  };

  state={
      show: "candidates",
  }

  //testing: 
  componentDidMount(){
    this.props.dispatch(addMatch('matches', '5HJqzzhyA0Vcgwt0fi5AYcxtTlO2'));
  }

  render() {
    let renderComponent;
    //if the user hasn't allowed us access to their location, tell them they need to for the app to work
    if(!this.props.location){
      renderComponent = <Text>Oops, looks like we dont have access to your location. Please go to your settings to change this!</Text>
    }
    else if(this.state.show==='candidates'){
      renderComponent = <CandidatesScreen/>
    }
    else{
      renderComponent = <MatchmakerScreen
      navigate={()=>this.props.navigation.navigate('ContactsModal')}
      />
    }

    let candidatesIcon =
    <SimpleLineIcons
      name="people"
      size={27}
      color="white"
    />

    let matchmakerIcon =
    <Ionicons
      name="ios-heart"
      size={32}
      color="white"
    />


    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fbfbfb' }}>
        <View style={{ width: 100, paddingTop: 20 }}>
          <SwitchSelector
            initial={0}
            imageStyle={{justifyContent: 'center', alignItems: 'center'}}
            backgroundColor='grey'
            onPress={value => this.setState({ show: value })}
            buttonColor='#00387e'
            height={50}
            borderRadius='100'
            options={[
              { value: "candidates", customIcon: candidatesIcon },
              { value: "matchmaker", customIcon: matchmakerIcon }
            ]}
          />
        </View>

        {renderComponent}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.userInfo.user.location,
  };
};

export default connect(mapStateToProps)(HomeScreen);
