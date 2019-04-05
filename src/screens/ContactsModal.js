import React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Permissions, Contacts } from 'expo';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { ProfileCard } from '../components/ProfileCard';
import {Header} from 'react-navigation'


export class ContactsModal extends React.Component {

//Workingish Code Starts Here

//   _retrieveData = async () => {
//   try {
//     const value = await Contacts.getContactsAsync({
//       fields:  [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.SocialProfiles, Contacts.Fields.Relationships,],
//     });
//
//     if (value !== null) {
//       //console.log(value)
//         let contactnamearray = []
//         value.data.forEach(userValue=>{
//           contactnamearray.push(<ProfileCard title={userValue.name} />)
//
//           return contactnamearrays;
//         });
//     } else {
//       return(<ActivityIndicator/>)
//     }
//
//   } catch (error) {
//     // Error retrieving data
//   }
// };

//Workingish Code Ends here

  //
  // async showContacts(){
  //
  //   const contacts = await Contacts.getContactsAsync({
  //     fields:  [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.SocialProfiles, Contacts.Fields.Relationships,],
  //   });
  //
  //   if (contacts.total > 0) {
  //     return(<View><Text>Please Work</Text></View>)
  //   } else {
  //     return( <View><ActivityIndicator /></View>)
  //   }
  //
  // }


  render() {
    return (
      <View>
    //{this._retrieveData()}
      </View>
  )

    // return (
    //   <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
    //         <View  style={{ flex: 1, backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'flex-end' }}>
    //           <Button
    //               onPress={() => this.props.navigation.goBack()}
    //               title="Done"
    //               />
    //           </View>
    //         <View style={{ flex: 1, backgroundColor: 'red', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', }}>
    //           <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Contacts</Text>
    //         </View>
    //         <View style={{ flex: 18, backgroundColor: 'pink' }}>
    //         <ScrollView>
    //         <Button title='Touch Me' onPress={this.showContacts}/>
    //
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         <Text>HI</Text>
    //         </ScrollView>
    //         </View>
    //
    //   </SafeAreaView>
    // );
  }
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

export default connect(mapStateToProps)(ContactsModal);