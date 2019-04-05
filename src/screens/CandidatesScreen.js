import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    console.log('THE CANDIDATE IS', this.props.candidate)
    if(this.props.showMutualMatchScreen){
      this.startTimer()
      return (
        <Text>Mazal Tov You Matched With {this.props.candidate.name}</Text>
      )
    }
    else if(this.props.candidate){
      return (
        <View style={{ flex: 1, alignSelf: 'stretch'}}>
          <ImageBackground style={{ flex: 1, borderRadius: 20, backgroundColor: 'grey', margin: 20, justifyContent: 'flex-end',  }}>
          <View style={{ justifyContent: 'flex-end'  }}>

          <TouchableOpacity
            //show Profile Modal and change profile to 'candidate'
            onPress={this.props.navigate}
          >
          <Text style={{ margin: 30, fontSize: 17, fontWeight: 'bold', }}>{this.props.candidate.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>this.props.dispatch(acceptMatch(this.props.candidate.id))}
          >
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.props.dispatch(declineMatch(this.props.candidate.id))}
          >
            <Text>Decline</Text>
          </TouchableOpacity>
          </View>
          </ImageBackground>
        </View>
      );
    }
    else if (this.props.candidate===null){
      return <Text>No Candidates Left To Show At This Time. Come Back Soon!</Text>;
    }
    //loading
    else{
      return <ActivityIndicator/>
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
