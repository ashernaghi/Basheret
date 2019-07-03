import firebase from './firebase'

export const getUser = () => {
	console.log('getuser')
	return new Promise((resolve, reject) => {
		let user = firebase.auth().currentUser
		if (user) {
			console.log("USER FOUND", user);
			let userFirestore = firebase.firestore().collection('users').doc(user.uid);
	        userFirestore.get().then(function(doc) {
	            if (doc.exists) {
	                let data = doc.data()
	                console.log(data)
	                resolve({
	                	name: data.info.name,
				        id: user.uid,
				        _id: user.uid
				    })
	            } else {
	                // doc.data() will be undefined in this case
	                reject("no user")
	                console.log("No such document!");
	            }
	        }).catch(function(error) {
                reject("no user")
	            console.log("Error getting document:", error);
	        });
		}
		else {
            reject("no user")
	    	console.warn("NO USER FOUND")
		}
	})
}

export const getMessages = (recipientID) => {
	console.log('testing')
	return new Promise((resolve, reject) => {
		let messageRef = chatRef(recipientID).collection('messages');
		messageList = []
		messageRef.limit(10).get()
	      .then(function(querySnapshot) {
	        querySnapshot.forEach(function(doc) {
	            messageList.push(parse(doc.data()))
	        });
	        resolve(messageList)
	    })
	    .catch(e => {
	      	console.warn('ERROR',e)
	    	resolve([])
	    })
	});
}

export const sendMessage = (messages, recipientID) => {
	let messageRef = chatRef(recipientID).collection('messages');
  	for (let i = 0; i < messages.length; i++) {
	    const { text } = messages[i];
	    const timestamp = getTimestamp();
		console.log('sending', recipientID, timestamp)
	    const message = {
	      text,
	      timestamp
	    };
    messageRef.add(message);
    }
};

//Create the location for the chat by using the format
const chatRef = (recipientID) => {
	let location = ""
	let userID = firebase.auth().currentUser.uid
	if (userID < recipientID) 
		location = userID + recipientID
	else 
		location = recipientID + "--"+ userID
	let messageRef = firebase.firestore().collection('chats').doc(location)
	return messageRef
}

//Parse message
const parse = (snapshot) => {
	console.log('parsing', snapshot)
	const { timestamp, text, user } = snapshot;
  	const { key: _id } = snapshot;
  	const timestamp = new Date(numberStamp);
  	const message = {
	    _id,
	    timestamp,
	    text,
	    user,
	};
	return message;
}

const getTimestamp = ()=> {
	console.log('timestamp', firebase.firestore.FieldValue.serverTimestamp());
  return firebase.firestore.FieldValue.serverTimestamp()
}

