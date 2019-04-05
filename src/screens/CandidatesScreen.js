import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

export class CandidatesScreen extends React.Component {
  decision(bool){
    //if bool is true, user accepts candidate -> trigger addMatch fn:

    //if bool is false, user declines candidate -> trigger declineMatch fn: 
  }

  render() {
    if(this.props.candidate){
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>   
          <Text>Candidate is: {this.props.candidate.name}</Text>
          <TouchableOpacity
            onPress={()=>this.decision(true)}
            disabled={false}
          >
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.decision(false)}
            disabled={false}
          >
            <Text>Decline</Text>
          </TouchableOpacity>
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
  return {
    candidate: state.userInfo.user.candidate,
  };
};

export default connect(mapStateToProps)(CandidatesScreen);