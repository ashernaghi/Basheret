import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';

export class CandidatesScreen extends React.Component {

  render() {
    if(this.props.candidate){
      return (
        <View style={{ flex: 1, alignSelf: 'stretch'}}>
          <ImageBackground style={{ flex: 1, borderRadius: 20, backgroundColor: 'grey', margin: 20, justifyContent: 'flex-end',  }}>
          <View style={{ justifyContent: 'flex-end'  }}>
          <Text style={{ margin: 30, fontSize: 17, fontWeight: 'bold', }}>{this.props.candidate.name}</Text>
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
  return {
    candidate: state.userInfo.user.candidate,
  };
};

export default connect(mapStateToProps)(CandidatesScreen);
