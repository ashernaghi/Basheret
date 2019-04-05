import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {acceptMatch, declineMatch, getCandidate, mutualMatch} from '../actions/matchActions'
import {showProfileScreen} from '../actions/UserInfoActions';

export class CandidatesScreen extends React.Component {
  startTimer(){
    console.log('STARTING TIMER')
    setTimeout( ()=> {
      this.props.dispatch(mutualMatch(false))
      this.props.dispatch(getCandidate())
    }, 4000 );
  }

  render() {
    if(this.props.showMutualMatchScreen){
      this.startTimer()
      return (
        <Text>Mazal Tov You Matched With {this.props.candidate.name}</Text>
      )
    }
    else if(this.props.candidate){
      return (
        <View style={{ flex: 1, alignSelf: 'stretch'}}>
          <ImageBackground style={{ flex: 1, borderRadius: 20, backgroundColor: 'grey', margin: 20, justifyContent: 'flex-end',  }}   onPress={this.props.navigate}>
          <View style={{ justifyContent: 'flex-end'  }}>

          <TouchableOpacity
            //show Profile Modal and change profile to 'candidate'

          >
            <Text style={{ margin: 30, fontSize: 17, fontWeight: 'bold', }}>{this.props.candidate.name}</Text>
          </TouchableOpacity>

          <MaterialCommunityIcons
            name='checkbox-marked-circle'
            onPress={()=>this.props.dispatch(acceptMatch(this.props.candidate.id))}
            size={30}
          />
          <MaterialCommunityIcons
            name='close-circle'
            onPress={()=>this.props.dispatch(declineMatch(this.props.candidate.id))}
            size={30}
          />
          
          </View>
          </ImageBackground>
        </View>
      );
    }
    //we'd show loading:
    else{
      return null;
    }
  }
}

const mapStateToProps = state => {
  console.log('SHOW MUTUAL MATCH SCREEN IS', state.nav.showMutualMatchScreen)
  return {
    candidate: state.userInfo.user.candidate,
    showMutualMatchScreen: state.nav.showMutualMatchScreen
  };
};

export default connect(mapStateToProps)(CandidatesScreen);
