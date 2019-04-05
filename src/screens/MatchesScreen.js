import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet } from 'react-native';
import {getAnotherUser} from '../actions/UserInfoActions';

export class MatchesScreen extends React.Component {

  generateMatchCards(){
    if(this.props.matchesCards) {
      return this.props.matchesCards.map((matchCard, index)=>{
        //ASHER: make a card of the match here:
        return (
          <View style={styles.matchCardStyle}>

            <View style={styles.imageStyle}>
              <Text>Image</Text>
            </View>

            <View>
              <Text key={index}>{matchCard.name}</Text>
            </View>
          </View>
        )
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        {this.generateMatchCards()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    matches: state.userInfo.user.matches,
    matchesCards: state.userInfo.user.matchesCards
  };
};

export default connect(mapStateToProps)(MatchesScreen);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  matchCardStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor: 'pink',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },

  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'grey',


  }
})
