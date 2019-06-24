import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
//import styles from '../styles/styles';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';
import ProfileCard from '../components/ProfileCard';
import MultilineProfileCard from '../components/MultilineProfileCard';
import CandidateProfileCard from '../components/CandidateProfileCard';
import CandidateMultilineProfileCard from '../components/CandidateMultilineProfileCard';
import styles from '../styles/styles';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { showProfileScreen, updateUserInfo, uploadProfilePicture } from '../actions/UserInfoActions';
import {positiveMatch, negativeMatch} from '../actions/matchActions'
import EditProfilePhotoActionSheet from '../components/EditProfilePhotoActionSheet';

export class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      profilePhoto: '',
      permissionsError: null,
      cameraRollPermissions: null,
      cameraPermissions: null,
      choosemethod: '',};
  }

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

  askCameraPermissionsAsync = async () => {
    let cameraPermission = await Permissions.askAsync(Permissions.CAMERA);

    console.log(cameraPermission);

    if(cameraPermission.status==="denied"){
      console.log('1');
      this.setState({permissionsError: 'Oops! Looks like you haven\'t granted Basheret permission to your Camera. Please go into your settings and change that so you can take a picture for your profile!'});
    }
    else{
      console.log('2')
      this.setState({permissionsError: null, cameraPermissions: true})
    }
  };

  askCameraRollPermissionsAsync = async () => {
    let cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(cameraRollPermission.status==="denied"){
      console.log('1');
      this.setState({permissionsError: 'Oops! Looks like you haven\'t granted Basheret permission to your Camera Roll. Please go into your settings and change that so you can upload a picture for your profile!'});
    }
    else{
      console.log('2');
      this.setState({permissionsError: null, cameraRollPermissions: true})
    }
  };

  useLibraryHandler = async () => {
    await this.askCameraRollPermissionsAsync();
    if(this.state.cameraRollPermissions){
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
      });
      if(!result.cancelled){
        this.props.dispatch(updateUserInfo('info', 'profilePhoto', result.uri));
        // this.props.dispatch(uploadProfilePicture(result))
      }
    }
  };

  useCameraHandler = async () => {
    let x = await this.askCameraPermissionsAsync();
    console.log('x', x);
    if(this.state.cameraPermissions){
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
      });
      if(!result.cancelled){
        this.props.dispatch(updateUserInfo('info', 'profilePhoto', result.uri));
        console.log('RESULT IS', result);
        // this.props.dispatch(uploadProfilePicture(result))
      }
    }

  };

  onClick(clickedState){
    this.setState({choosemethod: clickedState})
  }

  render() {
    //later age: console.log('AGE IS', moment().diff('1989-03-28', 'years')),
    return (
        <ScrollView style={{ backgroundColor: '#F4F4F4' }}>

          <SafeAreaView style={{ backgroundColor: '#F4F4F4' }}>

          {this.props.type==='candidate' &&
          <View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
              <MaterialCommunityIcons
                name='close'
                onPress={()=>{this.props.navigation.goBack();}}
                size={25}
                style={{ marginTop: 10, marginRight: 10,}}
              />
            </View>

            <View style={styles.profilePhoto}>

              <ImageBackground
              source={{ uri: this.props.profilePhoto }}
              style={styles.profilePhoto}>
                <Text style={{ marginLeft: 30, fontSize: 20, color: 'white', fontWeight: 'bold', paddingBottom: 40, textShadowColor: 'grey', textShadowOffset: { width: -1, height: 0 },textShadowRadius: 0.5,}} >{this.props.name}</Text>
              </ImageBackground>

            </View>

            <View>
              <CandidateProfileCard title= 'Name' content= {this.props.name} />
              <CandidateMultilineProfileCard title='About Me' content={this.props.aboutMe} />
              <CandidateProfileCard title= 'Age' content = {this.props.age} />
              <CandidateProfileCard title= 'Gender' content= {this.props.gender} />
              <CandidateProfileCard title= 'Denomination' content= {this.props.denomination} />
              <CandidateProfileCard title= 'Kashrut Level' content= {this.props.kashrutObservance} />
              <CandidateProfileCard title= 'Shabbat Observance' content= {this.props.shabbatObservance} />
              <CandidateProfileCard title= 'Hometown' content = {this.props.hometown} />
              <CandidateProfileCard title= 'Current Residence' content = {this.props.currentresidence} />
              <CandidateProfileCard title= 'Location' content = '' />
              <CandidateProfileCard title= 'High School' content = {this.props.highschool} />
              <CandidateProfileCard title= 'Yeshiva/Midrasha' content = {this.props.yeshivamidrasha} />
              <CandidateProfileCard title= 'University' content = {this.props.university} />
              <CandidateProfileCard title= 'Shomer' content= {this.props.shomer} />
            </View>

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

          </View>
          }

              {this.props.type==='self' &&
            <View style={{ flex: 1, }}>
              <View style={{}}>

                <EditProfilePhotoActionSheet
                  onClick={clickedState => this.setState({choosemethod: clickedState})}
                  handleCamera={this.useCameraHandler}
                  handleLibrary={this.useLibraryHandler}
                  style={styles.profilePhoto}
                  />

              </View>

              <View style={{ backgroundColor: '#F4F4F4' }}>
              {this.state.permissionsError && <Text>{this.state.permissionsError}</Text>}
                <ProfileCard title= 'Name' content= {this.props.name} onPress={() => this.props.navigation.navigate('EditName')}/>
                <MultilineProfileCard title='About Me' content={this.props.aboutMe} onPress={() => this.props.navigation.navigate('EditAboutMe')}/>
                <ProfileCard title= 'Age' content = {this.props.age} onPress={() => this.props.navigation.navigate('EditAge')}/>
                <ProfileCard title= 'Gender' content= {this.props.gender} onPress={() => this.props.navigation.navigate('EditGender')}/>
                <ProfileCard title= 'Denomination' content= {this.props.denomination} />
                <ProfileCard title= 'Kashrut Level' content= {this.props.kashrutObservance} />
                <ProfileCard title= 'Shabbat Observance' content= {this.props.shabbatObservance} />
                <ProfileCard title= 'Hometown' content= {this.props.hometown} onPress={() => this.props.navigation.navigate('EditHometown')}/>
                <ProfileCard title= 'Current Residence' content= {this.props.currentresidence} onPress={() => this.props.navigation.navigate('EditCurrentResidence')}/>
                <ProfileCard title= 'High School' content= {this.props.highschool} onPress={() => this.props.navigation.navigate('EditHighSchool')} />
                <ProfileCard title= 'Yeshiva/Midrasha' content= {this.props.yeshivamidrasha} onPress={() => this.props.navigation.navigate('EditYeshivaMidrasha')}/>
                <ProfileCard title= 'University' content= {this.props.university} onPress={() => this.props.navigation.navigate('EditUniversity')} />
                <ProfileCard title= 'Shomer' content= {this.props.shomer} onPress={() => this.props.navigation.navigate('EditShomer')}/>

              </View>
            </View>}

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
      name: state.userInfo.user.info.name,
      age: state.userInfo.user.info.age,
      denomination: state.userInfo.user.info.denomination,
      shabbatObservance: state.userInfo.user.info.shabbatObservance,
      kashrutObservance: state.userInfo.user.info.kashrutObservance,
      profilePhoto: state.userInfo.user.info.profilePhoto,
      gender: state.userInfo.user.info.gender,
      type: state.nav.showProfileScreen,
      aboutMe: state.userInfo.user.info.aboutMe,
      shomer: state.userInfo.user.info.shomer,
      hometown: state.userInfo.user.info.hometown,
      currentresidence: state.userInfo.user.info.currentresidence,
      highschool: state.userInfo.user.info.highschool,
      university: state.userInfo.user.info.university,
      yeshivamidrasha: state.userInfo.user.info.yeshivamidrasha,

    };
  }
  //this might be either candidate or match:
  else if (state.userInfo.user[type]!==null){
    return {
      id: state.userInfo.user[type].id,
      name: state.userInfo.user[type].name,
      age: state.userInfo.user[type].age,

      denomination: state.userInfo.user[type].denomination,
      shabbatObservance: state.userInfo.user[type].shabbatObservance,
      kashrutObservance: state.userInfo.user[type].kashrutObservance,
      profilePhoto: state.userInfo.user[type].profilePhoto,
      gender: state.userInfo.user[type].gender,
      type: state.nav.showProfileScreen,
      aboutMe: state.userInfo.user[type].aboutMe,
      shomer: state.userInfo.user[type].shomer,
      hometown: state.userInfo.user[type].hometown,
      currentresidence:  state.userInfo.user[type].currentresidence,
      highschool: state.userInfo.user[type].highschool,
      university: state.userInfo.user[type].university,
      yeshivamidrasha: state.userInfo.user[type].yeshivamidrasha,
    }
  }
};

export default connect(mapStateToProps)(ProfileScreen);
