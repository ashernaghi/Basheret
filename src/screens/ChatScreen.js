import React from 'react'
import firebase from '../actions/firebase'
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat'
import { getMessages, sendMessage, getUser } from '../actions/chatActions'
import {getCurrentMatches} from '../actions/matchActions';

export class ChatScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

	state = {
	    messages: [],
	  }

	constructor(props) {
		super(props)
		this.matchObject = this.props.navigation.state.params.m;
	}

	componentWillMount() {
	    getUser()
		.then((user) => {
			this.setState({user})
			getMessages(this.matchObject.id, message => {
				// console.log('got message', mes)
				this.setState(previousState => ({
			        messages: GiftedChat.append(previousState.messages, message),
		        }))
			})
		})
	  }

	// async componentDidMount() {
	// 	console.log('mounted')
	// 	this.props.dispatch(getMessages)
	// 	getMessages()
	// 	// console.log(this.props)
	//  //    .then(message => {
	//  //    	console.log('mes',message)
	//  //    	if(message == undefined) {
	//  //    		this.setState({messages: []})
	//  //    		return;
	//  //    	}
	//  //      this.setState(previousState => ({
	//  //        messages: GiftedChat.append(previousState.messages, message),
	//  //      }))
	// 	// })
	// 	// .catch(e =>{
	// 	// 	console.warn("NO MESSAGES")
	// 	// })
	// }

	  onSend(newMessage = []) {
	    sendMessage(newMessage, this.matchObject.id)
	  }



  render() {
  	// console.log('currentState', this.state)
    return (
      <SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>
				<TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()}>
					<Ionicons
						name="ios-arrow-back"
						size={25}
						color="grey"
					/>
				</TouchableOpacity>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Image
          	style={styles.imageStyle}
          	source={{uri: this.matchObject.profilePhoto}}
        	/>
					<Text style={{ fontWeight: 'bold', paddingTop: 10 }}>{this.matchObject.name}</Text>
				</View>
			<View
			  style={{
			    borderBottomColor: 'grey',
			    borderBottomWidth: 0.5,
					marginTop: 20,
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

const mapStateToProps = state => {
	console.log(state)
  return {
    chats: state.chats,
  };
};

export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
	imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
  },
})
