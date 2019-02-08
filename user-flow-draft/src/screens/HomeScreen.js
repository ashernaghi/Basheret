import React from 'react';
import { View, Text, Button } from 'react-native';
import CandidatesScreen from './CandidatesScreen';
import MatchmakerScreen from './MatchmakerScreen';
import { Ionicons } from '@expo/vector-icons';

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Candidates"
        onPress={()=>this.setState({candidates: true})}
        />
        <Button
        title="Matchmaker"
        onPress={()=>this.setState({candidates: false})}
        />
        {renderComponent}
      </View>
    );
  }
}
