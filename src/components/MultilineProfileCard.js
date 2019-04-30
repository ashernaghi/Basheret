import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


class MultilineProfileCard extends Component {
  constructor(props){
    super(props);
    this.state={
      notEmpty: ''
    };
  }

  // notEmptyFn(){
  //   if
  // }

  renderCard(){
    if(this.props.filled){
      return(
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.newCardStyle}>
            <Text style={styles.titleStyle}>{this.props.title}</Text>
            <Text style={styles.textStyle}>{this.props.content}</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.newCardStyle}>
            <Text style={styles.titleStyle}>{this.props.title}</Text>
            <Text style={styles.textStyle}>+++++++++++++++Empty symbols++++++++++++++</Text>
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
    padding: 10
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

});
