import firebase from './firebase';
import { USER_INFO_UPDATE_SUCCESS, FETCH_USER_SUCCESS, GET_ANOTHER_USER_SUCCESS, SHOW_PROFILE_SCREEN } from './types';
import { Location, Permissions } from 'expo';

export const userInfoUpdateSuccess = (category, subcategory, response) => ({
    type: USER_INFO_UPDATE_SUCCESS,
    subcategory,
    response,
    category
});

export const uploadProfilePicture = (rawFile) => dispatch => {
    let location = 'profilePicture';
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let storage = firebase.storage();
    fetch(rawFile.uri)
        .then(buf => {
            let fileName = location;
            let file = new File([buf], fileName);
            let fileLocation = storage.ref().child("/users/"+userID+"/"+location);
            let fileUpload = fileLocation.put(file);
            fileUpload.on('state_changed', function(snapshot){
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            }, function(error) {
              // Handle unsuccessful uploads
            }, function() {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              fileUpload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                dispatch(updateUserInfo('info', 'profilePhoto', downloadURL));
                return downloadURL;
              });
            });
        })
};

export const getFile = (location) => dispatch => {
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let storage = firebase.storage();
    let fileRef = storage.ref().child('/users/'+userID+'/'+location);
    fileRef.getDownloadURL().then((url) => {
        return url;
    })
}

//Updates the user's information in the database:
export const updateUserInfo = (category='', subcategory='', response) => dispatch =>{
    //QUESTION: these arent async?...
    let user = firebase.auth().currentUser;
	let userID = user.uid;
    let userFirestore = firebase.firestore().collection('users').doc(userID);
    let userInfo = {};
    if(subcategory){
        userInfo[category] = {}
        userInfo[category][subcategory]=response;
    }
    else{
        userInfo[category]=response;
    }
    userFirestore.set(userInfo, {merge: true});
    dispatch(userInfoUpdateSuccess(category, subcategory, response));
};

export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    user,
});

export const getUser = (props) => dispatch =>  {
    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirestore = firebase.firestore().collection('users').doc(userID);
        userFirestore.get().then(function(doc) {
            if (doc.exists) {
                let data = doc.data();
                if(data.initialSetupComplete){
                    console.log('1.ASKING LOCATION')
                    this._getLocationAsync(dispatch);
                    dispatch(fetchUserSuccess(data));
                    setTimeout( ()=> props.navigation.navigate('App'), 2000 );
                }
                else{
                    props.navigation.navigate('IntroQuestions');
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    else{
        props.navigation.navigate('Onboarding');
    }
}

_getLocationAsync = async (dispatch) => {
    console.log('2. GETTING LOCATION')
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(updateUserInfo('location', null, null));
    }
    else{
      let location = await Location.getCurrentPositionAsync({});
      dispatch(updateUserInfo('location', null, location.coords));
    }
  };

export const getAnotherUserSuccess = (user, category) => ({
    type: GET_ANOTHER_USER_SUCCESS,
    user,
    category
});

export const getAnotherUser = (userID, category) => dispatch  => {
    let userFirestore = firebase.firestore().collection('users').doc(userID);
    userFirestore.get().then(function(doc) {
        if (doc.exists) {
            console.log('GETTING ANOTHER USR', doc.data().info);
            let candidate = {'id': userID, ...doc.data().info}
            dispatch(getAnotherUserSuccess(candidate, category));
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

export const showProfileScreen = (category, card=null) => ({
    type: SHOW_PROFILE_SCREEN,
    category,
    card
});
