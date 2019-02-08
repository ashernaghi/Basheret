import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CandidatesScreen from './CandidatesScreen';
import MatchmakerScreen from './MatchmakerScreen';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import SwitchSelector from "react-native-switch-selector";

export default class HomeScreen extends React.Component {
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
      headerLeft: (
        <Ionicons 
          onPress={() => navigation.openDrawer()} 
          name="ios-menu" 
          size={32} 
          color="black" 
          style={{paddingLeft: 10}}
        />
      ),
      headerRight: (
        <Ionicons 
          onPress={() => navigation.navigate('Chat')} 
          name="ios-chatbubbles" 
          size={32} 
          color="black" 
          style={{paddingRight: 10}}
        />        
      )
    }
  };

  constructor(props){
    super(props)

    this.state={
      show: "candidates",
    }
  }

  render() {
    let renderComponent; 
    if(this.state.show==='candidates'){
      renderComponent = <CandidatesScreen/>
    }
    else{
      renderComponent = <MatchmakerScreen/>
    }

    let candidatesIcon = 
    <MaterialCommunityIcons 
      name="account-heart"
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
      <View style={{flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, width: 150, alignItems: 'center', paddingTop: 20 }}>
          <SwitchSelector
            initial={0}
            imageStyle={{justifyContent: 'center', alignItems: 'center'}}
            onPress={value => this.setState({ show: value })}
            buttonColor='pink'
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

const styles = StyleSheet.create({

})