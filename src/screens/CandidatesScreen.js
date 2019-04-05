import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

export class CandidatesScreen extends React.Component {

  render() {
    if(this.props.candidate){
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>   
          <Text>Candidate is: {this.props.candidate.name}</Text>
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