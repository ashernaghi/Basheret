import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  PermissionsAndroid
} from "react-native";
import * as SMS from "expo-sms";
import { connect } from "react-redux";
import * as Contacts from "expo-contacts";
import firebase from "../../src/actions/firebase";
import { SearchBar } from "react-native-elements";
import SearchInput, { createFilter } from "react-native-search-filter";
import HomeScreen from './HomeScreen';
class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: [],
      phoneConatcts: [],
      newArray: [],
      search: "",
      data12: []
    };
  }

  loadContacts = () => {
    var contact1 = {
      name: "",
      number: ""
    };
    var contact2 = [];
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(
        function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.data().info.phoneNumber != undefined) {
              if (doc.data().info.name != undefined) {
                contact2.push({
                  name: doc.data().info.name,
                  number: doc.data().info.phoneNumber,
                  profilePhoto: doc.data().info.profilePhoto,
                  userID: doc.id
                });
              } else {
                contact2.push({
                  name: "No Name",
                  number: doc.data().info.phoneNumber,
                  profilePhoto: doc.data().info.profilePhoto,
                  userID: doc.id
                });
              }
            }
          });

          this.setState({
            contacts: contact2,
            isLoading: false
          });
          var arr1 = contact2;
          var newArr = this.state.phoneConatcts;

          var myArray = [];
          arr1.forEach(item1 => {
            newArr.forEach(item2 => {
              if (item1.number === item2.number) {
                item2.userID = item1.userID;
                item2.name = item1.name;
                item2.profilePhoto = item1.profilePhoto;
                myArray.unshift(item1);
              } else {
                myArray.unshift(item2);
              }
            });
          });
          this.setState({
            newArray: newArr,
            data12: myArray
          });
        }.bind(this)
      );
  };

  async showFirstContactAsync() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts."
    }).then(() => {
      console.log("Permission successfull");
    });
    const contacts = await Contacts.getContactsAsync().then(contacts => {
      var data = contacts.data;
      var contactMobile = [];
      data.forEach((doc, index) => {
        if (doc.phoneNumbers != undefined) {
          const a = doc.phoneNumbers;
          const [b] = a;
          var c = {
            name: doc.name,
            number: b.number,
            profilePhoto: "",
            userID: ""
          };
          contactMobile.push(c);
        }
      });
      this.setState({
        phoneConatcts: contactMobile
      });
    });
  }

  searchFilterFunction = text => {
    const newData = this.state.newArray.filter(item => {
      const itemData = item.name;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ data12: newData });
  };

  searchFunction = () => {
    const filtered = this.state.newArray.filter(
      createFilter(this.state.search, ["name"])
    );
    this.setState({ data12: filtered });
  };

  componentDidMount() {
    this.showFirstContactAsync();
    // console.log("In this state user is :::....");
    // console.log(this.props.navigation.state.params.user);
    this.setState({ isLoading: true });
    this.loadContacts();
  }
  // console.log("This is good touch :: " + item.userID);
  // console.log("This is profile photo :: " + item.profilePhoto);
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.userID != "") {
          if (this.props.navigation.state.params.user === 1) {
            let data = {
              userId1: item.userID,
              username1: item.name,
              userProfile1: item.profilePhoto
            };
            this.props.adduser1(data);
          } else {
            let data = {
              userId2: item.userID,
              username2: item.name,
              userProfile2: item.profilePhoto
            };
            this.props.adduser2(data);
          }
        } else {
          const { result } = SMS.sendSMSAsync(
            [item.number],
            "Please click on following link to download App"
          );
        }

this.props.navigation.goBack(null);
      }}>
      <View style={{ minHeight: 70, padding: 5 }}>
        <Text
          style={{
            color: "rgb(255, 108, 117)",
            fontWeight: "bold",
            fontSize: 26
          }}>
          {item.name}
        </Text>
        <Text style={{ color: "rgb(255, 108, 117)", fontWeight: "bold" }}>
          {item.number}
        </Text>
        <Text style={{ color: "rgb(255, 108, 117)" }}>
          {item.userID !== "" ? "From app contacts" : "From phone contacts"}
        </Text>
      </View>
    </TouchableOpacity>
  );
  updateSearch = search => {
    this.setState({ search: search });
  };
  render() {
    const search = this.state.search;
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: "#2f363c" }} />

        <SearchBar
          placeholder='Type Here...'
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => {
            this.setState({ search: text });
            this.searchFunction();
          }}
          value={search}
        />
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: "center",
                justifyContent: "center"
              }}>
              <ActivityIndicator size='large' color='rgb(255, 108, 117)' />
            </View>
          ) : null}
          <FlatList
            data={this.state.data12}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 50
                }}>
                <Text style={{ color: "rgb(255, 108, 117)" }}>
                  No Contacts Found
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.contact
  };
}

function mapDispatchToProps(dispatch) {
  return {
    adduser1: data => dispatch({ type: "ADD_USER_1", payload: data }),
    adduser2: data => dispatch({ type: "ADD_USER_2", payload: data })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
