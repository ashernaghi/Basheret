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

  _retrieveData = async () => {
  try {
    const value = await Contacts.getContactsAsync({
      fields:  [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.SocialProfiles, Contacts.Fields.Relationships,],
    });

    if (value !== null) {
      //console.log(value.data.name[0])
        let contactNameArray = []
        value.data.forEach(userValue=>{
          contactNameArray.push(userValue.name)
        })
        console.log(contactnamearray);
        let betterContactNameArray = []
        betterContactNameArray = contactnamearray.forEach(nameOfContact=>{<View><Text>{nameOfContact}</Text></View>
        }
        )
        console.log('-------------')
        console.log(betterContactNameArray);
    } else {
      return(<ActivityIndicator/>)
    }

  } catch (error) {
    // Error retrieving data
  }
};

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
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //     {}
  //     <Text>This feature is under construction...</Text>
  //     <Button
  //                  onPress={() => this.props.navigation.goBack()}
  //                  title="Done"
  //                  />
  //     </View>
  // )

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <View  style={{ flex: 1, backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button
                  onPress={() => this.props.navigation.goBack()}
                  title="Done"
                  />
              </View>
            <View style={{ flex: 1, backgroundColor: 'red', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Contacts</Text>
            </View>
            <View style={{ flex: 18, backgroundColor: 'pink' }}>
            <ScrollView>
            <Button title='Touch Me' onPress={() => this._retrieveData()}/>
            </ScrollView>
            </View>

      </SafeAreaView>
    );
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
