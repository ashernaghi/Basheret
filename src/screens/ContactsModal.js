import React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Permissions, Contacts } from 'expo';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { ProfileCard } from '../components/ProfileCard';
import {Header} from 'react-navigation'

export class ContactsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount(){
    this._retrieveData();
  }

  _retrieveData = async () => {
  try {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    //data is an array of objects, so we will now set the state with this new information 
    if (data !== null) {
      this.setState({contacts: data});
    } 
    else {
      console.log('IN ELSE')
      return <ActivityIndicator/>
    }
  } 
  catch (error) {
    // Error retrieving data
    console.log('THERE WAS AN ERROR')
  }
};

  generateContactCards = () => {
    if(this.state.contacts.length){
      return this.state.contacts.map(contact=><Text>{contact.firstName}</Text>)
    }
  }

  render() {
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
            {this.generateContactCards()}
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
