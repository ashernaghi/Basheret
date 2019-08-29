import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons, Feather } from '@expo/vector-icons';


class CandidateProfileCard extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    if(this.props.content){
      return(
        <View style={styles.newCardStyle}>

          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center',  }}>

            <View style={{ marginLeft: 7, }}>
              <Text style={styles.titleStyle}>{this.props.title}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 7, }} >
              <Text style={styles.textStyle}>{this.props.content}</Text>
            </View>

          </View>

        </View>
      )
    } else {
      return(
        <View />
      )
    }
  }
}

export default withNavigation(CandidateProfileCard);

const styles = StyleSheet.create({
  newCardStyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 8,
    padding: 6,
  },

  titleStyle: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingLeft: 5,

  },

  textStyle: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    padding: 5,
    justifyContent: 'center',

  },

});
