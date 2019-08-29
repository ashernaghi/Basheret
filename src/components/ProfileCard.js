import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons, Feather } from '@expo/vector-icons';

class ProfileCard extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    if(this.props.content){
      return(
        <TouchableOpacity
        style={styles.newCardStyle}
        onPress={this.props.onPress}>

          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center',  }}>

            <View style={{ maxWidth: '40%', justifyContent: 'flex-start', marginRight: 55, }}>
              <Text style={styles.titleStyle}>{this.props.title}</Text>
            </View>

          
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}>
              <Text style={styles.textStyle}>{this.props.content}</Text>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color="grey"
                style={{ marginLeft: 20, marginRight: 12 }}/>
            </View>
          </View>

        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity
        style={styles.newCardStyle}
        onPress={this.props.onPress}>

          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center',  }}>

            <View>
              <Text style={styles.titleStyle}>{this.props.title}</Text>
            </View>

            <View style={{ justifyContent: 'center' }}>
              <Feather
              name="plus"
              size={30}
              color="grey"
              style={{ marginRight: 6 }}
              />
            </View>

          </View>

        </TouchableOpacity>
      )
    }

  }
}

export default withNavigation(ProfileCard);

const styles = StyleSheet.create({
  newCardStyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 3,
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
    justifyContent: 'flex-end',
  },

});
