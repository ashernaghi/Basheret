import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, Feather } from '@expo/vector-icons';


class MultilineProfileCard extends Component {
  constructor(props){
    super(props);
    this.state={
      notEmpty: ''
    };
  }


  renderCard(){
    if(this.props.content){
      return(
        <TouchableOpacity
          onPress={this.props.onPress}
          style={styles.newCardStyle}
          >
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

              <View style={{flexDirection: 'column', marginRight: 5, }}>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
                <Text style={styles.textStyle}>{this.props.content}</Text>
              </View>

              <View style={{ justifyContent: 'center', margin: 5}}>
                <Ionicons
                  name="ios-arrow-forward"
                  size={30}
                  color="grey"
                  style={{}}/>
              </View>

          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity
          onPress={this.props.onPress}
          style={styles.newCardStyle}
          >
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

              <View style={{flexDirection: 'column', }}>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
                <Text style={styles.emptyTextStyle}>Tell us about yourself...</Text>
              </View>

              <View style={{ justifyContent: 'center'}}>
                <Feather
                name="plus"
                size={30}
                color="grey"
                style={{}}
                />
              </View>

          </View>
        </TouchableOpacity>
    )
    }
  }
  render() {
     return (
       <View>
       {this.renderCard()}
       </View>
     )
  }
}

const mapStateToProps = state => {
  return {
    denomination: state.userInfo.user.info.denomination,
    shabbatObservance: state.userInfo.user.info.shabbatObservance,
    kashrutObservance: state.userInfo.user.info.kashrutObservance,
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
    gender: state.userInfo.user.info.gender,
    aboutMe: state.userInfo.user.info.aboutMe
  };
};

export default connect(mapStateToProps)(MultilineProfileCard);


const styles = StyleSheet.create({
  newCardStyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 8,
    padding: 6,


  },

  cardStyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "#fbfbfb",
    alignSelf: 'stretch',
    padding: 10,
  },

  titleStyle: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingLeft: 5,
    justifyContent: 'center',

  },

  textStyle: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    padding: 5,
    justifyContent: 'center',

  },

  emptyTextStyle: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    color: 'grey',
    padding: 5,
    justifyContent: 'center',

  },

});
