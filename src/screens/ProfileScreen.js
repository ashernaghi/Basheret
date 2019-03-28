import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
//import styles from '../styles/styles';
import { connect } from 'react-redux';
import { ProfileCard } from '../components/ProfileCard';
import moment from 'moment';
import styles from '../styles/styles';

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
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
        <Text style={ styles.headerText} >
            Profile
        </Text>
      ),
      headerLeft: (
        <Ionicons
          onPress={() => navigation.navigate('Settings')}
          name="ios-settings"
          size={32}
          color="black"
          style={styles.headerIcons}
        />
      ),
    }
  };

  render() {
    // console.log('AGE IS', moment().diff('1989-03-28', 'years'))
    return (
      <View style={{ backgroundColor: '#fafafa' }}>
      <ScrollView>
        <View style={{ backgroundColor: '#fafafa' }}>
            <Image 
              source={{ uri: this.props.profilePhoto }} 
              style={styles.profilePhoto} />
            <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('EditProfileModal')}
            >
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          <View>
            <ProfileCard title= 'Name' content= {this.props.name} />
            <ProfileCard title= 'Gender' content= {this.props.gender} />
            <ProfileCard title= 'Denomination' content= {this.props.denomination} />
            <ProfileCard title= 'Kashrut Level' content= {this.props.kashrutObservance} />
            <ProfileCard title= 'Shabbat Observance' content= {this.props.shabbatObservance} />
            <ProfileCard title= 'Shabbat t' content= {this.props.shabbatObservance} />
            <ProfileCard title= 'Shabbat s' content= {this.props.shabbatObservance} />
            <ProfileCard title= 'Shabbat v' content= {this.props.shabbatObservance} />
          </View>
        </View>
      </ScrollView>
      </View>
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