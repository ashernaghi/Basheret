import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ProfileCard } from '../components/ProfileCard';
import moment from 'moment';
import styles from '../styles/styles';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';



export class MatchmakerScreen extends React.Component {

  CardMaker(){
    let cardArray = []
    for (let thing in this.props.info) {
      let value = this.props.info[thing]
      console.log(value)
      cardArray.push(<ProfileCard title={thing} content={this.props.info[thing]} />)
    }
    return cardArray
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => console.log(Object.keys(this.props).length)}
          style={{ borderWidth: 1, marginTop: 40}}
        >
          <Text>Click Me</Text>
        </TouchableOpacity>
        {this.CardMaker()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    info: state.userInfo.user.info,
    denomination: state.userInfo.user.info.denomination,
    shabbatObservance: state.userInfo.user.info.shabbatObservance,
    kashrutObservance: state.userInfo.user.info.kashrutObservance,
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
    gender: state.userInfo.user.info.gender
  };
};

export default connect(mapStateToProps)(MatchmakerScreen);
