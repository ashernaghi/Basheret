import React from "react";
import firebase from "../actions/firebase";
import { connect } from "react-redux";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { GiftedChat } from "react-native-gifted-chat";
import { getMessages, sendMessage, getUser } from "../actions/chatActions";
import { getCurrentMatches } from "../actions/matchActions";

const chatRef = (userId, recipientID) => {
  let location = "";
  let userID = userId;
  if (userID < recipientID) location = userID + "--" + recipientID;
  else location = recipientID + "--" + userID;
  let messageRef = firebase
    .firestore()
    .collection("chats")
    .doc(location);
  return messageRef;
};

export class ChatScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
	    return {
	      header: null,
	    }
	  };

	state = {
    messages: [],
    user: null
  };

  constructor(props) {
    super(props);
    this.matchObject = this.props.navigation.state.params.m;
  }

  // componentWillMount() {
  //     getUser()
  // 	.then((user) => {
  // 		this.setState({user})
  // 		getMessages(this.matchObject.id, message => {
  // 			// console.log('got message', mes)
  // 			this.setState(previousState => ({
  // 		        messages: GiftedChat.append(previousState.messages, message),
  // 	        }))
  // 		})
  // 	})
  //   }
  async componentWillMount() {
    await getUser().then(user => {
      this.setState({ user });
      this.getMessages(user.id, this.matchObject.id);
    });
  }

  //   Sarah Added
  getMessages = (userId, recipientID) => {
    let messageRef = chatRef(userId, recipientID).collection("messages");
    messageRef.orderBy('createdAt', 'desc').limit(20).onSnapshot(querySnapshot => {
      messageList = [];
      querySnapshot.forEach(doc => {
        let temp = doc.data();
        let time = new Date(parseInt(doc.data().createdAt.seconds + "000"));
        temp.createdAt = time;
        messageList.push(temp);
      });
      this.setState({ messages: messageList }, () => {
        console.log(this.state.messages);
      });
    });
  };


  onSend(newMessage = []) {
	let messageRef = chatRef(this.state.user.id, this.matchObject.id).collection("messages");
	messageRef.doc(newMessage[0].createdAt.getTime().toString()).set(newMessage[0]);
  }

  render() {
    // console.log('currentState', this.state)
    return (
			<SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>

				<View style={{ flexDirection: 'row', marginTop: 10 }}>
					<View  style={{ flex: 1, }}>
						<TouchableOpacity style={{  flex: 1, paddingLeft: 20, paddingTop: 10, }} onPress={() => this.props.navigation.goBack()}>
							<Ionicons
								name="ios-arrow-back"
								size={25}
								color="grey"
							/>
						</TouchableOpacity>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
						<Image
							style={styles.imageStyle}
							source={{uri: this.matchObject.profilePhoto}}
						/>
						<Text style={{ fontWeight: 600, paddingTop: 10 }}>{this.matchObject.name}</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20, paddingTop: 11 }}>
						<MaterialCommunityIcons
							name='flag-variant'
							onPress={()=>{this.props.navigation.navigate('ReportUser')}}
							size={25}
							color= 'grey'
						/>
					</View>
				</View>

			<View
				style={{
					borderBottomColor: 'grey',
					borderBottomWidth: 0.5,
					marginTop: 10,
				}}
				/>

			<GiftedChat
					messages={this.state.messages}
					onSend = {messages => this.onSend(messages)}
					user={this.state.user}
					inverted={true}
				/>
		</SafeAreaView>
    );
  }
}

// const mapStateToProps = state => {
//   console.log(state);
//   return {
//     chats: state.chats
//   };
// };

// export default connect(mapStateToProps)(ChatScreen);
export default ChatScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "grey",
    alignSelf: "center",
    justifyContent: "center"
  }
});
