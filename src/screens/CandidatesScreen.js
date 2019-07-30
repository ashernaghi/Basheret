import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getCandidate, mutualMatch} from '../actions/matchActions'
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
        <View style={{ flex: 1, alignSelf: 'center', backgroundColor: '#F4F4F4'}}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, color: 'black', marginTop: 30, alignSelf: 'center' }}>Mazal Tov You Matched With {this.props.candidate.name}</Text>
        </View>
      )
    }
    else if(this.props.candidate){
      return (
        <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#f4f4f4'}}>
          <TouchableOpacity style={{ flex: 1, borderRadius: 20, margin: 20,  }}
            //show Profile Modal and change profile to 'candidate'
            onPress={this.props.navigate}>
            <ImageBackground style={{ flex: 1, }} imageStyle={{borderRadius: 20, }} source={{ uri: this.props.candidate.profilePhoto }}>

              <View style={{flex: 1,}}>

                <View style={{flex: 1, justifyContent: 'flex-end', }}>
                  <Text style={{ marginLeft: 30, fontSize: 20, color: 'white', fontWeight: 'bold',  textShadowColor: 'grey', textShadowOffset: { width: -1, height: 0 }, textShadowRadius: 0.5, }}>{this.props.candidate.name}, {this.props.candidate.age}</Text>
                  <Text style={{ marginLeft: 30, fontSize: 20, color: 'white', fontWeight: 'bold', paddingBottom: 40, textShadowColor: 'grey', textShadowOffset: { width: -1, height: 0 }, textShadowRadius: 0.5, }}>{this.props.candidate.currentresidence}</Text>
                </View>

              </View>

            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    }
    else if (this.props.candidate===null){
      return( <View style={{ flex: 1, alignSelf: 'center', backgroundColor: '#F4F4F4'}}>
              <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, color: 'black', marginTop: 30, alignSelf: 'center' }}>No Candidates To Show.</Text>
              <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, color: 'black', marginTop: 10, alignSelf: 'center' }}>Come Back Soon!</Text>
                </View>
      )
    }
    //loading
    else{
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>)
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
