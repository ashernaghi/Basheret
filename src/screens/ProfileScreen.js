import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
//import styles from '../styles/styles';
import { connect } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import styles from '../styles/styles';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {showProfileScreen} from '../actions/UserInfoActions';
import {positiveMatch, negativeMatch} from '../actions/matchActions'

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        headerTintColor: '#F4F4F4',
        headerStyle: {
          backgroundColor: '#F4F4F4',
          shadowColor: 'transparent',
          borderBottomColor:'transparent',
          borderBottomWidth: 0
        },
        headerRight: (
          <TouchableOpacity style={ styles.touchableOpacityHeader } onPress={() => navigation.navigate('Home')}>
            <Ionicons
              name="ios-arrow-forward"
              size={30}
              color="grey"
              style={styles.headerIcons}
            />
          </TouchableOpacity>
        ),
        headerTitle: (
          <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, color: '#00387e', }} >
              Basheret
          </Text>
        ),
        headerLeft: (
          <Ionicons
            onPress={() => navigation.navigate('Settings')}
            name="ios-settings"
            size={32}
            color="grey"
            style={styles.headerIcons}
          />
        ),
      }
    };

  componentWillUnmount(){
    this.props.dispatch(showProfileScreen('self'))
  }

  render() {
    //later age: console.log('AGE IS', moment().diff('1989-03-28', 'years'))
    return (
        <ScrollView style={{ backgroundColor: '#F4F4F4' }}>

          <SafeAreaView style={{ backgroundColor: '#F4F4F4' }}>

          {this.props.type==='candidate' &&
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
            <MaterialCommunityIcons
              name='close'
              onPress={()=>{this.props.navigation.goBack();}}
              size={25}
              style={{ marginTop: 10, marginRight: 10,}}
            />
          </View>
          }

              <View style={styles.profilePhoto}>

                <ImageBackground
                  source={{ uri: this.props.profilePhoto }}
                  style={styles.profilePhoto}
                  >
                  </ImageBackground>

              </View>

            <View style={{ backgroundColor: '#F4F4F4' }}>
              <ProfileCard title= 'Name' content= {this.props.name} onPress={() => this.props.navigation.navigate('EditName')}/>
              <ProfileCard title= 'Age' content = '22' onPress={() => this.props.navigation.navigate('EditAge')}/>
              <ProfileCard title= 'Gender' content= {this.props.gender} />
              <ProfileCard title= 'Hometown' content = 'Los Angeles' />
              <ProfileCard title= 'Location' content = 'New York' />
              <ProfileCard title= 'Denomination' content= {this.props.denomination} />
              <ProfileCard title= 'Kashrut Level' content= {this.props.kashrutObservance} />
              <ProfileCard title= 'Shabbat Observance' content= {this.props.shabbatObservance} />
            </View>

            {this.props.type==='candidate' &&
            <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
              <MaterialCommunityIcons
                name='close-circle'
                onPress={()=>{
                  this.props.dispatch(negativeMatch(this.props.id));
                  this.props.navigation.goBack();
                }}
                size={50}
                style={{ marginTop: 10, marginBottom: 10, marginLeft: 50, marginRight: 50,}}
              />
              <MaterialCommunityIcons
                name='checkbox-marked-circle'
                onPress={()=>{
                  this.props.dispatch(positiveMatch(this.props.id))
                  this.props.navigation.goBack()
                }}
                size={50}
                style={{ marginTop: 10, marginBottom: 10, marginLeft: 50, marginRight: 50,}}
              />
            </View>
            }
          </SafeAreaView>

        </ScrollView>

    );
  };
}

const mapStateToProps = state => {
  let type = state.nav.showProfileScreen;
  console.log('TYPE IS', type)
  if(state.nav.showProfileScreen==='self'){
    return {
      denomination: state.userInfo.user.info.denomination,
      shabbatObservance: state.userInfo.user.info.shabbatObservance,
      kashrutObservance: state.userInfo.user.info.kashrutObservance,
      name: state.userInfo.user.info.name,
      profilePhoto: state.userInfo.user.info.profilePhoto,
      gender: state.userInfo.user.info.gender,
      type: state.nav.showProfileScreen,
    };
  }
  //this might be either candidate or match:
  else if (state.userInfo.user[type]!==null){
    return {
      name: state.userInfo.user[type].name,
      denomination: state.userInfo.user[type].denomination,
      shabbatObservance: state.userInfo.user[type].shabbatObservance,
      kashrutObservance: state.userInfo.user[type].kashrutObservance,
      profilePhoto: state.userInfo.user[type].profilePhoto,
      gender: state.userInfo.user[type].gender,
      id: state.userInfo.user[type].id,
      type: state.nav.showProfileScreen,
    }
  }
};

export default connect(mapStateToProps)(ProfileScreen);



//
// <View>
//   <TouchableOpacity
//     onPress={()=>this.props.navigation.navigate('EditProfileModal')}
//     style={{ width: 137, height: 41, backgroundColor: '#00387e', borderRadius: 30, margin: 10, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', }}
//   >
//     <MaterialIcons
//       name="edit"
//       size={16}
//       color="white"
//       style={{ alignSelf: 'center', justifyContent: 'center', marginRight: 4, }}
//     />
//     <Text style={{ color: 'white', alignSelf: 'center',}}>Edit Profile</Text>
//   </TouchableOpacity>
/// </View>
