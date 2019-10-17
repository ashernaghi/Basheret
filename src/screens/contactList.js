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
import { Ionicons } from '@expo/vector-icons';
class ContactList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  constructor(props) {
   super(props);
    this.state={
      contacts: [],
      isLoading: true,
    } 
  }

 loadContact = async()=> {

    const {data} = await Contacts.getContactsAsync({
      fields:[Contacts.Fields.PhoneNumbers, Contacts.Fields.Image]
    })

    this.setState({contacts: data})
    console.log(data);
  }

  async componentDidMount(){
    this.loadContact()
  }

  renderItem = ({item}) =>(
    <TouchableOpacity>
      <View style={styles.contactCard}>
        <View style={{paddingLeft: 20, paddingRight: 20, alignSelf: 'center',}}>
          {this.renderPhoto(item)}
        </View>
        <View style={{paddingTop: 23}}>
          <Text style={styles.nameStyle}>
            {item.firstName}{item.lastName}
          </Text>
          <Text style={styles.foundIn}>
            found in contacts
          </Text>
        </View>
      </View>
      <View style={{height: 1, width: '100%', backgroundColor: 'grey', marginLeft: 20}}>
      </View>
    </TouchableOpacity>
  )

  renderPhoto = ({item}) =>(
      <Ionicons
        name={'ios-contact'}
        size={55}
        color="grey"
      />
  )

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Ionicons
            name={'ios-close'}
            size={40}
            color="grey"
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerStyle}>Contacts</Text>
        <View style={{paddingTop: 20}}>
          <SearchBar
            placeholder="Search"
            containerStyle={{backgroundColor: '#C4C4C4', height: 45, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
            inputContainerStyle={{backgroundColor: '#EAE8E8', borderRadius: 15, height: 22}}
          />
          <View>
            
            <FlatList 
             data={this.state.contacts}
             renderItem={this.renderItem}
             listEmptyComponent={()=><Text>No Contacts Found</Text>}
             keyExtractor={(item, index) => index.toString()}
            />
          </View>
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


export default connect( mapStateToProps )(ContactList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerStyle: {
    backgroundColor: "#fff",
    fontWeight: 'bold', 
    fontFamily: 'fitamint-script', 
    fontSize: 50, 
    paddingLeft: 16,
    paddingTop: 15,
  },

  contactCard: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
  },

  closeIcon: {
    paddingTop: 35,
    alignSelf: 'flex-end',
    paddingRight: 30,
  },

  nameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'helvetica-neue'
  },

  foundIn: {
    color: 'grey',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
