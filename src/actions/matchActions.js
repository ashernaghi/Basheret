import * as firebase from 'firebase';
import { USER_MATCH_UPDATE_SUCCESS } from './types';

export const userMatchUpdateSuccess = (category, matchId) => ({
    type: USER_MATCH_UPDATE_SUCCESS,
    category,
    matchId
});

//Updates the user's information in the database: 
export const addMatch = (category, matchId) => dispatch =>{
    console.log("adding match");
    let user = firebase.auth().currentUser;
	let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/"+category);
    userCategoryRef.push().set({id: matchId});
    dispatch(userMatchUpdateSuccess(category, matchId));
}
//Categories should be matches, potential, and never. In the future there will be a function to check this.

//Remove the cooresponding category a user is in - not working
export const removeMatch = (category, matchID) => dispatch =>{
    console.log("removing"+category+matchID);
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.remove();
};

//Returns a list of User IDs for the cooresponding category
export const getMatches = (category) => dispatch =>  {
    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID+"/matches");
        userFirebase.orderByChild("group").equalTo(category).on("value", 
            function(snapshot) {
               console.log(snapshot);
               let matches = new Array();
                snapshot.forEach(value=>{
                    matches.push(value.key);
                });
                return matches;
        });
    }
    else{
        props.navigation.navigate('Onboarding');
    }
}


