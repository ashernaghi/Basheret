import React from 'react';
import { connect } from 'react-redux';
import { View, Text, } from 'react-native';
import CandidatesScreen from './CandidatesScreen';
import MatchmakerScreen from './MatchmakerScreen';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import SwitchSelector from "react-native-switch-selector";
import styles from '../styles/styles';

export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Basheret',
      headerStyle: {
        backgroundColor: 'pink',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // headerLeft: (
      //   <Ionicons 
      //     onPress={() => navigation.openDrawer()} 
      //     name="ios-menu" 
      //     size={32} 
      //     color="black" 
      //     style={{paddingLeft: 10}}
      //   />
      // ),
      headerLeft: (
        <MaterialCommunityIcons 
          onPress={() => navigation.navigate('Profile')} 
          name="account-edit" 
          size={32} 
          color="black" 
          style={ styles.headerIcons }
        />
      ),
      headerRight: (
        <MaterialCommunityIcons 
          onPress={() => navigation.navigate('Social')}
          name="account-heart" 
          size={32} 
          color="black" 
          style={ styles.headerIcons }
        />        
      )
    }
  };

  state={
      show: "candidates",
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
      renderComponent = <MatchmakerScreen/>
    }

    let candidatesIcon = 
    <Ionicons 
      name="ios-heart"
      size={32} 
      color="black" 
    />

    let matchmakerIcon =
    <SimpleLineIcons 
      name="magic-wand" 
      size={32} 
      color="black" 
    />  
    
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'wheat' }}>
        <View style={{ width: 100, paddingTop: 20 }}>
          <SwitchSelector
            initial={0}
            imageStyle={{justifyContent: 'center', alignItems: 'center'}}
            backgroundColor='rgba(232, 171, 227, .3)'
            onPress={value => this.setState({ show: value })}
            buttonColor='rgb(232, 171, 227)'
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