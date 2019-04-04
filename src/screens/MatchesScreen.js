import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {getAnotherUser} from '../actions/UserInfoActions';

export class MatchesScreen extends React.Component {
  componentDidMount(){
    for(let match in this.props.matches){
      this.props.dispatch(getAnotherUser(this.props.matches[match].id, 'matchesCards'))
    }
  }

  generateMatchCards(){
    if(this.props.matchesCards)
    return this.props.matchesCards.map((matchCard, index)=>{
      //ASHER: make a card of the match here: 
      return <Text key={index}>{matchCard.name}</Text>
    })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.generateMatchCards()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('Matches Cards is', state.userInfo.user.matchesCards)
  return {
    matches: state.userInfo.user.matches,
    matchesCards: state.userInfo.user.matchesCards
  };
};

export default connect(mapStateToProps)(MatchesScreen);

