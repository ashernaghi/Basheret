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

              <View style={{flexDirection: 'column', marginRight: 5, maxWidth: '95%'}}>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
                <Text style={styles.textStyle}>{this.props.content}</Text>
              </View>

              <View style={{ justifyContent: 'center', marginRight: 10}}>
                <Ionicons
                  name="ios-arrow-forward"
                  size={30}
                  color="grey"
                  style={{}}/>
              </View>

          </View>
        </TouchableOpacity>
      )
    } else if(this.props.gradient){
        return(
          <TouchableOpacity
            onPress={this.props.onPress}
            style={styles.newCardStyle}
            >
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                <View style={{flexDirection: 'column', marginRight: 5, flex: 14}}>
                  <Text style={styles.titleStyle}>{this.props.title}</Text>
                  {this.props.gradient}
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'flex-end', margin: 7, flex: 1}}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={30}
                    color="grey"
                    style={{}}/>
                </View>

            </View>
          </TouchableOpacity>
        )
    } else if(this.props.hobbycontent) {
      return(
        <TouchableOpacity
          onPress={this.props.onPress}
          style={styles.hobbyCardStyle}
          >
            <View style={{flexDirection: 'row', flex: 1, }}>

              <View style ={{flexDirection: 'column', marginRight: 5, flex: 14 }}>
                <View style={{flexDirection: 'column', marginBottom: 8, }}>
                  <Text style={styles.titleStyle}>{this.props.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                  {this.props.hobbycontent.map((item, index) => (<View style={styles.hobbyStyle}><Text style={styles.hobbyTextStyle}>{item}</Text></View>))}
                </View>
              </View>

              <View style={{ justifyContent: 'center', margin: 5, flex: 1}}>
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
                <Text style={styles.emptyTextStyle}>{this.props.placeHolder}</Text>
              </View>

              <View style={{ justifyContent: 'center'}}>
                <Feather
                name="plus"
                size={30}
                color="grey"
                style={{paddingRight: 1}}
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 6,
  },

  hobbyCardStyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 8,
    paddingRight: 6,
    paddingLeft: 6,
    paddingTop: 6,
    paddingBottom: 15,
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

  hobbyStyle:{
    margin: 3,
    borderRadius: 20,
    backgroundColor: "#00387e",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  hobbyTextStyle:{
    fontSize: 15,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
