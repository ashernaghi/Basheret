import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {getCurrentMatches} from '../actions/matchActions';

export class MatchesScreen extends React.Component {
  componentDidMount(){
    this.props.dispatch(getCurrentMatches());
  }

  generateMatchCards(){
    if(this.props.matchesCards) {
      return this.props.matchesCards.map((matchCard, index)=>{
        return (
          <View key={index} style={styles.matchCardStyle}>

            <View>
            <Image style={styles.imageStyle} source={{ uri: matchCard.profilePhoto }}/>
            </View>

            <View style={styles.textStyle}>
              <TouchableOpacity
              //show Profile Modal and change profile to 'candidate'
              onPress={()=>this.props.navigate(matchCard)}
              >
              <Text key={index} >{matchCard.name}</Text>
              </TouchableOpacity>
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
    borderBottomWidth: 0.75,
    borderColor: 'grey',
    height: 75,
  },

  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    alignSelf: 'center',
    margin: 10,
    justifyContent: 'center',
  },

  textStyle: {
    alignSelf: 'center',
    marginLeft: 5,
  },
})
