import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
//import styles from '../styles/styles';
import { connect } from 'react-redux';
import { ProfileCard } from '../components/ProfileCard';
import moment from 'moment';
import styles from '../styles/styles';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

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

  render() {
    // console.log('AGE IS', moment().diff('1989-03-28', 'years'))
    return (
        <ScrollView style={{ backgroundColor: '#F4F4F4' }}>

          <View style={{ backgroundColor: '#F4F4F4' }}>

              <View style={styles.profilePhoto}>

                <ImageBackground
                  source={{ uri: this.props.profilePhoto }}
                  style={styles.profilePhoto}
                  >
                  </ImageBackground>

              </View>

            <View style={{ backgroundColor: '#F4F4F4' }}>
              <ProfileCard title= 'Name' content= {this.props.name} />
              <ProfileCard title= 'Gender' content= {this.props.gender} />
              <ProfileCard title= 'Denomination' content= {this.props.denomination} />
              <ProfileCard title= 'Kashrut Level' content= {this.props.kashrutObservance} />
              <ProfileCard title= 'Shabbat Observance' content= {this.props.shabbatObservance} />
            </View>

          </View>

        </ScrollView>

    );
  };
}


const mapStateToProps = state => {
  return {
    denomination: state.userInfo.user.info.denomination,
    shabbatObservance: state.userInfo.user.info.shabbatObservance,
    kashrutObservance: state.userInfo.user.info.kashrutObservance,
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
    gender: state.userInfo.user.info.gender
  };
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
