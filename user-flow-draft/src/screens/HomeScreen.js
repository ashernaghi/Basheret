import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CandidatesScreen from './CandidatesScreen';
import MatchmakerScreen from './MatchmakerScreen';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

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
        />
      ),
      headerRight: (
        <Ionicons 
          onPress={() => navigation.navigate('Chat')} 
          name="ios-chatbubbles" 
          size={32} 
          color="black" 
        />        
      )
    }
  };

  constructor(props){
    super(props)

    this.state={
      candidates: true,
    }
  }

  render() {
    let renderComponent; 
    if(this.state.candidates){
      renderComponent = <CandidatesScreen/>
    }
    else{
      renderComponent = <MatchmakerScreen/>
    }

    return (
      <View style={{flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <MaterialCommunityIcons 
            styles={styles.icons}
            name="account-heart"
            size={32} 
            color="black" 
            onPress={()=>this.setState({candidates: true})}
          />
          <SimpleLineIcons 
            styles={styles.icons}
            name="magic-wand" 
            size={32} 
            color="black" 
            onPress={()=>this.setState({candidates: false})}
          />          
        </View>
        {renderComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    flex: 1,
  }
})