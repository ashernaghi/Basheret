import React from 'react'
import firebase from '../actions/firebase'
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { getMessages, sendMessage, getUser } from '../actions/chatActions'
import {getCurrentMatches} from '../actions/matchActions';

export class ChatScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {messages: []}
	}

	componentDidMount() {
	    getUser()
		.then((user) => {
			getMessages(user.id)
			.then(messages => {
				this.setState({user, messages})
				console.log('setState',this.state)
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

	  onSend(messages = []) {
	    this.setState(previousState => ({
	      messages: GiftedChat.append(previousState.messages, messages),
	    }))
	    sendMessage(messages, this.state.user.id)
	  }

  render() {
  	console.log('currentState', this.state)
    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
	    <GiftedChat
	        messages={this.state.messages}
	        onSend = {messages => this.onSend(messages)}
	        user={this.state.user}
	      />
      </View>
    );
  }
}

const mapStateToProps = state => {
	console.log(state)
  return {
    chats: state.chats
  };
};

export default connect(mapStateToProps)(ChatScreen);



