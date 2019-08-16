import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground, SafeAreaView, Animated } from 'react-native';
//import styles from '../styles/styles';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';
import Svg, { Line, Circle, G, Text as TextSVG, TSpan } from 'react-native-svg';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import MultilineProfileCard from '../components/MultilineProfileCard';
import CandidateProfileCard from '../components/CandidateProfileCard';
import CandidateMultilineProfileCard from '../components/CandidateMultilineProfileCard';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { showProfileScreen, updateUserInfo, uploadProfilePicture } from '../actions/UserInfoActions';
import {positiveMatch, negativeMatch} from '../actions/matchActions'
import EditProfilePhotoActionSheet from '../components/EditProfilePhotoActionSheet';
import {options, questions, category} from '../common/arrays'


export class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      profilePhoto: '',
      permissionsError: null,
      cameraRollPermissions: null,
      cameraPermissions: null,
      choosemethod: '',
      gradientLineHeight: 100,
      gradientLineWidth: 300,
      count: 1,
      timer: 10,
      fadeAnimation: new Animated.Value(0)
    };
  }



   static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      }
    };

  componentDidMount(){
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }

  componentDidUpdate(){
    if(this.state.timer === 0){
      clearInterval(this.interval);
    }
  }

  componentWillUnmount(){
    this.props.dispatch(showProfileScreen('self'))
    clearInterval(this.interval)
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

renderCandidateGradient (gradientValue, type){
  const position = gradientValue*((this.state.gradientLineWidth+30)/100)
  var value;
  if(type === 'denomination'){
     value = 1
  } else if( type === 'kashrutObservance'){
     value = 2
  } else if(type === 'shabbatObservance'){
     value = 3
  }

  return(
    <View style={{ flex: 1}}>

      <View style={{ width: this.state.gradientLineWidth+30, height: 110,  margin: 5,}}>

        <View style={{marginTop: 35, marginBottom: 35, borderBottomWidth: 1, borderBottomColor: 'black', borderRadius: 0.5 }}></View>

        <View style={{borderRadius: 3, width: 6, height: 25, backgroundColor: '#00387e', position: 'absolute', top: 25, alignSelf: 'center', zIndex: 2 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.renderLabels(value, gradientValue, 330)}
          {this.renderLines(value, gradientValue, 330)}
        </View>

      </View>
    </View>

    )
}


renderProfileGradient (gradientValue, type){
  const position = gradientValue*(this.state.gradientLineWidth/100)
  var value;
  if(type === 'denomination'){
     value = 1
  } else if( type === 'kashrutObservance'){
     value = 2
  } else if(type === 'shabbatObservance'){
     value = 3
  }

  return(
    <View style={{ flex: 1}}>

      <View style={{ width: this.state.gradientLineWidth, height: 110,  margin: 5,}}>

        <View style={{marginTop: 35, marginBottom: 35, borderBottomWidth: 1, borderBottomColor: 'black', borderRadius: 0.5 }}></View>

        <View style={{borderRadius: 3, width: 6, height: 25, backgroundColor: '#00387e', position: 'absolute', top: 25, alignSelf: 'center', zIndex: 2 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.renderLabels(value, gradientValue, 300)}
          {this.renderLines(value, gradientValue, 300)}
        </View>

      </View>
    </View>

    )
}

renderLabels(value, gradientValue, lineWidth){
  return options[value].map((label, index)=> {
    if(gradientValue >= 0 ){
      if((index*25)>(gradientValue-30) && (index*25)<(gradientValue+30)){
        return (
          <View style={{width: 100, position: 'absolute', left: (((lineWidth/2)+(((index*25)-gradientValue)*5))-48)}} >
            <Text style={{fontSize: 12, textAlign: 'center',}} key={index}>{label}</Text>
          </View>
        )
      }
    }
  })
}
renderLines(value, gradientValue, lineWidth){
  return options[value].map((label, index)=> {
    if(gradientValue >= 0 ){
      if((index*25)>(gradientValue-30) && (index*25)<(gradientValue+30)){
        return (
          <View style={{borderRadius: 1, width: 2, height: 10, zIndex: 1, backgroundColor: 'black', position: 'absolute', bottom: 30, left: ((lineWidth/2)+(((index*25)-gradientValue)*5)) }}></View>
        )
      }
    }
  })
}

renderChoice(){
  if(this.state.timer > 0 ){
    return (<View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
              <Text style ={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', padding: 5, }}>Even David didn't judge Batsheva that quickly.</Text>
              <Text style ={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 5, }}>Decide in: {this.state.timer}</Text>
            </View>)
  } else {
    Animated.timing(this.state.fadeAnimation, {toValue: 100, duration: 5000 }).start()
    return (<Animated.View style={{ flexDirection: 'row', alignSelf: 'center', opacity: this.state.fadeAnimation, }}>
              <MaterialCommunityIcons
                name='close-circle'
                onPress={()=>{
                  this.props.dispatch(negativeMatch(this.props.id));
                  this.props.navigation.goBack();
                }}
                size={50}
                style={{ marginTop: 25, marginBottom: 25, marginLeft: 50, marginRight: 50,}}
              />
              <MaterialCommunityIcons
                name='checkbox-marked-circle'
                onPress={()=>{
                  this.props.dispatch(positiveMatch(this.props.id))
                  this.props.navigation.goBack()
                }}
                size={50}
                style={{ marginTop: 25, marginBottom: 25, marginLeft: 50, marginRight: 50,}}
              />
            </Animated.View>)
  }
}

  render() {
    return (

        <ScrollView style={{ backgroundColor: '#F4F4F4' }}>
          <SafeAreaView style={{ backgroundColor: '#F4F4F4' }}>



          {this.props.type==='candidate' &&
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
              <MaterialCommunityIcons
                name='flag-variant'
                onPress={()=>{this.props.navigation.navigate('ReportUser')}}
                size={25}
                color= 'grey'
                style={{ marginTop: 10, marginRight: 10,}}
              />
              <MaterialCommunityIcons
                name='close'
                onPress={()=>{this.props.navigation.goBack()}}
                size={25}
                color= 'grey'
                style={{ marginTop: 10, marginRight: 3,}}
              />
            </View>

            <View style={styles.profilePhoto}>

              <ImageBackground
              source={{ uri: this.props.profilePhoto }}
              style={styles.profilePhoto}>
                <View style={{ flex: 1, }}>

                  <View>
                  </View>

                  <View>
                    <Text style={{ marginLeft: 25, marginTop: 290, fontSize: 23, color: 'white', fontWeight: 'bold', textShadowColor: '#242424', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 6,}} >
                      {this.props.name}, {this.props.age}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ marginLeft: 25, marginTop: 0, fontSize: 17, color: 'white', fontWeight: 'bold', textShadowColor: '#242424', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 6,}} >
                      {this.props.currentresidence}
                    </Text>
                  </View>
                </View>
              </ImageBackground>

            </View>

            <View>
              <CandidateMultilineProfileCard title='About Me' content={this.props.aboutMe} />
              <CandidateProfileCard title= 'Age' content = {this.props.age} />
              <CandidateProfileCard title= 'Gender' content= {this.props.gender} />
              <CandidateMultilineProfileCard title= 'Denomination' gradient={this.renderCandidateGradient(this.props.denomination, 'denomination')} />
              <CandidateMultilineProfileCard title= 'Kashrut Level' gradient={this.renderCandidateGradient(this.props.kashrutObservance, 'kashrutObservance')} />
              <CandidateMultilineProfileCard title= 'Shabbat Observance' gradient={this.renderCandidateGradient(this.props.shabbatObservance, 'shabbatObservance')} />
              <CandidateProfileCard title= 'Hometown' content = {this.props.hometown} />
              <CandidateProfileCard title= 'Current Residence' content = {this.props.currentresidence} />
              <CandidateProfileCard title= 'Profession' content = {this.props.profession} />
              <CandidateProfileCard title= 'High School' content = {this.props.highschool} />
              <CandidateProfileCard title= 'Yeshiva/Seminary' content = {this.props.yeshivamidrasha} />
              <CandidateProfileCard title= 'University' content = {this.props.university} />
              <CandidateProfileCard title= 'Shomer' content= {this.props.shomer} />
            </View>
            <View>
            {this.renderChoice()}
            </View>
          </View>
        }


              {this.props.type==='self' &&
            <View style={{ flex: 1, }}>

              <View style={{}}>
                <Header navigation={this.props.navigation} text='Profile' leftIconName="ios-settings" rightIconName="ios-arrow-forward" leftDestination="Settings" rightDestination="Home"/>
                <EditProfilePhotoActionSheet
                  onClick={clickedState => this.setState({choosemethod: clickedState})}
                  handleCamera={this.useCameraHandler}
                  handleLibrary={this.useLibraryHandler}
                  style={styles.profilePhoto}
                  overlay={
                    <View style={{ paddingRight: 20, paddingBottom: 20, alignItems: 'center', justifyContent: 'center', }}>
                      <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'white', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
                        <View styles={{ zIndex: 2, alignItems: 'center', justifyContent: 'center' }}>
                          <MaterialIcons
                            name="edit"
                            size={18}
                            color="black"
                            style={styles.editPenStyle}
                          />
                        </View>
                      </View>
                    </View>
                }
                  >
                </EditProfilePhotoActionSheet>

              </View>

              <View style={{ alignItems: 'center', }}>
                <TouchableOpacity  style={{ backgroundColor: '#00387e', borderRadius: 20, marginTop: 13, marginBottom: 6, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                  <SimpleLineIcons
                  name='rocket'
                  size={18}
                  color= 'white'
                  style={{ paddingLeft: 22, paddingTop: 11, paddingBottom: 11, paddingRight: 10}}
                  />
                  <Text style={{ color: 'white', fontSize: 15, paddingRight: 22, }}>Premium</Text>
                </TouchableOpacity>
              </View>

              <View style={{ backgroundColor: '#F4F4F4' }}>
              {this.state.permissionsError && <Text>{this.state.permissionsError}</Text>}
                {this.state.matchProfile}
                <ProfileCard title= 'Name' content= {this.props.name} onPress={() => this.props.navigation.navigate('EditName')}/>
                <MultilineProfileCard title='About Me' content={this.props.aboutMe} placeHolder='Tell us about yourself...' onPress={() => this.props.navigation.navigate('EditAboutMe')}/>
                <ProfileCard title= 'Age' content = {this.props.age} onPress={() => this.props.navigation.navigate('EditAge')}/>
                <ProfileCard title= 'Gender' content= {this.props.gender} onPress={() => this.props.navigation.navigate('EditGender')}/>
                <MultilineProfileCard title= 'Denomination' gradient={this.renderProfileGradient(this.props.denomination, 'denomination')} onPress={() => this.props.navigation.navigate('EditDenomination')}/>
                <MultilineProfileCard title= 'Kashrut Level' gradient={this.renderProfileGradient(this.props.kashrutObservance, 'kashrutObservance')} onPress={() => this.props.navigation.navigate('EditKashrutLevel')} />
                <MultilineProfileCard title= 'Shabbat Observance' gradient={this.renderProfileGradient(this.props.shabbatObservance, 'shabbatObservance')} onPress={() => this.props.navigation.navigate('EditShabbatObservance')} />
                <ProfileCard title= 'Hometown' content= {this.props.hometown} onPress={() => this.props.navigation.navigate('EditHometown')}/>
                <ProfileCard title= 'Current Residence' content= {this.props.currentresidence} onPress={() => this.props.navigation.navigate('EditCurrentResidence')}/>
                <ProfileCard title= 'Profession' content= {this.props.profession} onPress={() => this.props.navigation.navigate('EditProfession')} />
                <ProfileCard title= 'University' content= {this.props.university} onPress={() => this.props.navigation.navigate('EditUniversity')} />
                <ProfileCard title= 'Yeshiva/Seminary' content= {this.props.yeshivamidrasha} onPress={() => this.props.navigation.navigate('EditYeshivaMidrasha')}/>
                <ProfileCard title= 'High School' content= {this.props.highschool} onPress={() => this.props.navigation.navigate('EditHighSchool')} />
                <ProfileCard title= 'Camp' content= {this.props.camp} onPress={() => this.props.navigation.navigate('EditCamp')}/>
                <ProfileCard title= 'Ethnicity' content= {this.props.ethnicity} onPress={() => this.props.navigation.navigate('EditEthnicity')} />
                <ProfileCard title= 'Shomer' content= {this.props.shomer} onPress={() => this.props.navigation.navigate('EditShomer')}/>
                <MultilineProfileCard title='Ideal Day' content={this.props.idealDay} placeHolder='What does your ideal day look like...' onPress={() => this.props.navigation.navigate('EditIdealDay')}/>
                <MultilineProfileCard title='Favorite Quote' content={this.props.favoriteQuote} placeHolder='The nature of the dilemma can be stated in a three-word sentence. I am lonely.' onPress={() => this.props.navigation.navigate('FavoriteQuote')}/>
                <MultilineProfileCard title='Favorite Book' content={this.props.favoriteBook} placeHolder='Tanakh... Obviously' onPress={() => this.props.navigation.navigate('FavoriteBook')}/>
                <MultilineProfileCard title='Hobbies' hobbycontent={this.props.hobbies} placeHolder='Learning Torah' onPress={() => this.props.navigation.navigate('HobbiesScreen')}/>
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
      profession: state.userInfo.user.info.profession,
      ethnicity: state.userInfo.user.info.ethnicity,
      idealDay: state.userInfo.user.info.idealDay,
      favoriteQuote: state.userInfo.user.info.favoriteQuote,
      favoriteBook: state.userInfo.user.info.favoriteBook,
      camp: state.userInfo.user.info.camp,
      hobbies: state.userInfo.user.info.hobbies,

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
      profession: state.userInfo.user[type].profession,
      ethnicity: state.userInfo.user[type].ethnicity,
      idealDay: state.userInfo.user[type].idealDay,
      favoriteQuote: state.userInfo.user[type].favoriteQuote,
      favoriteBook: state.userInfo.user[type].favoriteBook,
      camp: state.userInfo.user[type].camp,
      hobbies: state.userInfo.user[type].hobbies,
    }
  }
};

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  permissionsErrorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'fitamint-script',
    color: 'grey',
    fontSize: 25,
  },

  touchableOpacityHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },

  profilePhoto: {
    height: 350,
    width: 350,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },

  settingsIcon: {
    paddingLeft: 35,
    paddingRight: 35,
  },

  arrowIcon: {
    paddingLeft: 35,
    paddingRight: 35,
  },

  headerStyle: {
    backgroundColor: '#F4F4F4',
    shadowColor: 'transparent',
    borderBottomColor:'transparent',
    borderBottomWidth: 0,
    height: 90,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

});
