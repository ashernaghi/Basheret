import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchSelector from "react-native-switch-selector";
import ChatScreen from './ChatScreen';
import MatchesScreen from './MatchesScreen';
//import styles from '../styles/styles';
import {showProfileScreen} from '../actions/UserInfoActions';
import {getCurrentMatches} from '../actions/matchActions';


export class SocialScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  componentWillMount(){
    // getCurrentMatches();
    if (!this.props.matchesCards) {
        this.props.dispatch(getCurrentMatches());
    }
  }

  generateMatchCards(){
    const { navigate } = this.props.navigation;
    if(this.props.matchesCards) {
      return this.props.matchesCards.map((matchCard, index)=>{
        return (
          <TouchableOpacity key={index} style={styles.matchCardStyle} onPress={() => navigate('Chat', {m: matchCard})}>

            <TouchableOpacity style={styles.thumbnailContainerStyle} onPress={()=>this.props.navigate(matchCard)}>
              <Image style={styles.imageStyle} source={{ uri: matchCard.profilePhoto }}/>
            </TouchableOpacity>

            <View style={styles.textStyle}>
              <View
              //show Profile Modal and change profile to 'candidate'
              >
              <Text key={index} style={styles.titleStyle} >{matchCard.name}</Text>
              <Text style={styles.bodyStyle}>This is a test of the text df dfdf fdfdfdfd fdfdf fd fd  portion of the matchcard...</Text>
              </View>
            </View>
            <View style={ styles.buttonStyle }>
            <View>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color="grey"
                style={styles.headerIcons}
              />
            </View>
            </View>
          </TouchableOpacity>
        )
      })
    } else {
      return(
        <View style={{ alignSelf: 'center', }}>
        <Text style={{ fontSize: 20 }}>No Luck...Soon by you!</Text>
        </View>
      )
    }
  }

  render() {
    //console.log('MATCHCARDPROPS', this.props.matchesCards)

      return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
          <View style={styles.headerContainerStyle}>
            <View style={ styles.backArrowStyle }>
              <Ionicons
                name="ios-arrow-back"
                size={27}
                color="grey"
                onPress={() => this.props.navigation.navigate('Home')}
              />
            </View>
            <View style={styles.logoContainerStyle}>
              <Text style={styles.logoFontStyle}>Matches</Text>
            </View>
          </View>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          {this.generateMatchCards()}
        </ScrollView>
      </SafeAreaView>
      )

  }
}

const mapStateToProps = state => {
  return {
    matches: state.userInfo.user.matches,
    matchesCards: state.userInfo.user.matchesCards
  };
};

export default connect(mapStateToProps)(SocialScreen);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },

  headerContainerStyle: {
   flexDirection: 'row',
   justifyContent: 'center',
   borderBottomColor: 'grey',
   borderBottomWidth: 0.75,
   paddingBottom: 20,
 },

 backArrowStyle:{
   alignSelf: 'center',
   justifyContent:'flex-start',
 },

 logoContainerStyle:{
   alignSelf: 'center',
   alignItems:'center',
   justifyContent: 'center',
   marginRight: 90,
   marginLeft: 90, },

 logoFontStyle: {
   fontSize: 50,
   fontFamily: 'fitamint-script',
   color: '#00387e',
 },

  matchCardStyle: {
    flexDirection: 'row',
    borderBottomWidth: 0.75,
    borderColor: 'grey',
    height: 85,
    width: 345,
    alignSelf: 'flex-end',
  },

  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    // alignSelf: 'center',
    marginLeft: 15,
    marginTop: 10,
    maxWidth: 230,
    maxHeight:30
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 700,
    paddingBottom: 5,
  },
  bodyStyle:{
    fontSize: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginLeft: 'auto',
    width: 30
  }
})
