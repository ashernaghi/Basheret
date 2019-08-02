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


export const getMessages = (recipientID, callback) => {
	console.log('testing')
	let messageRef = chatRef(recipientID).collection('messages');
	messageList = []
	messageRef.limit(10)
	  .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            messageList.push(parse(doc.data()))
        });
        callback(messageList)
    })
}

export const sendMessage = (messages, recipientID,) => {
	let messageRef = chatRef(recipientID).collection('messages');
	let userID = firebase.auth().currentUser.uid
  	for (let i = 0; i < messages.length; i++) {
	    const { text } = messages[i];
	    const createdAt = getTimestamp();
			const _id = userID + '-' + Math.random().toString(36).substr(2, 9);
			const name = 'NEED TO FIGURE OUT NAME'
			const user = { userID, name }
		console.log('sending', recipientID, createdAt, user,)
	    const message = {
	    	_id,
	      text,
	      createdAt,
				user,
	    };
    messageRef.add(message);
    }
};

//Create the location for the chat by using the format
const chatRef = (recipientID) => {
	let location = ""
	let userID = firebase.auth().currentUser.uid
	if (userID < recipientID)
		location = userID + "--"+ recipientID
	else
		location = recipientID + "--"+ userID
	let messageRef = firebase.firestore().collection('chats').doc(location)
	return messageRef
}

// //Parse message
// const parse = (snapshot) => {
// 	// console.log('parsing', snapshot)
// 	const { numberStamp, text, user } = snapshot;
//   	//const { key: _id } = snapshot;
// 		const _id = snapshot.user._id;
//   	const createdAt = snapshot.timestamp;
//   	const message = {
// 	    _id,
// 	    createdAt,
// 	    text,
// 	    user,
// 	};
// 	return message;
// }

const parse = (snapshot) => {
	// console.log('parsing', snapshot)
    const { timestamp: numberStamp, text, user } = snapshot;
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };


export const getTimestamp = ()=> {
  return firebase.firestore.FieldValue.serverTimestamp()
}
