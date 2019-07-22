import React from 'react'
import firebase from '../actions/firebase'
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { getMessages, sendMessage, getUser } from '../actions/chatActions'
import {getCurrentMatches} from '../actions/matchActions';

export class ChatScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {messages: []}
		this.matchObject = this.props.navigation.state.params.m;
	}

	componentDidMount() {
	    getUser()
		.then((user) => {
			getMessages(this.matchObject.id)
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
	    sendMessage(messages, this.matchObject.id)
	  }

  render() {
  	console.log('currentState', this.state)
    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
			<Image
          style={styles.imageStyle}
          source={{uri: this.matchObject.profilePhoto}}
        />
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

const styles = StyleSheet.create({
	imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
  },
})
