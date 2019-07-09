import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {getCurrentMatches} from '../actions/matchActions';

export class MatchesScreen extends React.Component {
  componentDidMount(){
    // getCurrentMatches();
    if (!this.props.matchesCards) {
        this.props.dispatch(getCurrentMatches());
    }
  }

  generateMatchCards(){
    if(this.props.matchesCards) {
      return this.props.matchesCards.map((matchCard, index)=>{
        return (
          <View key={index} style={styles.matchCardStyle}>

            <View style={styles.thumbnailContainerStyle}>
              <Image style={styles.imageStyle} source={{ uri: matchCard.profilePhoto }}/>
            </View>

            <View style={styles.textStyle}>
              <TouchableOpacity
              //show Profile Modal and change profile to 'candidate'
              onPress={()=>this.props.navigate(matchCard)}
              >
              <Text key={index} style={styles.titleStyle} >{matchCard.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={ styles.buttonStyle }>
            <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color="grey"
                style={styles.headerIcons}
              />
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
    height: 90,
    width: 345,
    alignSelf: 'flex-end',
  },

  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    // alignSelf: 'center',
    marginLeft: 7,
    marginTop: 19,
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: 700,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginLeft: 'auto',
    width: 30
  }
})
