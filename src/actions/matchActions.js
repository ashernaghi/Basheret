import * as firebase from 'firebase';
import { USER_MATCH_UPDATE_SUCCESS, GET_MATCHES_SUCCESS, MUTUAL_MATCH_SCREEN, DELETE_ALL_MATCHES } from './types';
import {getAnotherUser, getAnotherUserSuccess} from './UserInfoActions'

/*Removes the cooresponding category a user is in*/
export const removeMatch = (category, matchID) => dispatch =>{
    console.log("removing"+category+matchID);
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.remove();
};

/*Currently not being used */
export const getMatchesSuccess = (matches) => ({
    type: GET_MATCHES_SUCCESS,
    matches,
});

export const deleteAllMatches = () => ({
    type: DELETE_ALL_MATCHES,
});

/*Returns a list of User IDs that mutually match */
export const getMatches = () => dispatch =>  {
    //delete matchesCards (or else it'll duplicate - not scalable)
    dispatch(deleteAllMatches());

    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID+"/matches");
        userFirebase.orderByChild("group").equalTo('MUTUAL_MATCH').once("value", 
            function(snapshot) {
                snapshot.forEach(value=>{
                    //for each match, get the info on that user: 
                    dispatch(getAnotherUser(value.key, 'matchesCards'))
                });
        });
    }
}

/*Returns the id for the next candidate that matches gender preference and isn't already in your matches*/ 
export const getCandidate = () => dispatch => {
    console.log('GETTING CANDIDATE')
    let result=''; //change later
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    //Get database reference to current user
    firebase.database().ref('/users/'+userID).once('value', function(snapshot) {
        let genderPreference =  snapshot.val().preferences.genderPreference;
        let userMatches = new Array();
        if(snapshot.val().matches){
            Object.keys(snapshot.val().matches).forEach(value=>{
                userMatches.push(value);
            });
        }
        let userCategoryRef = firebase.database().ref('/users/');
        //Iterate over all users in the database (problem: should stop once it finds someone, but right now it doesnt. problem: shouldnt be alphabetical, should be random)
        userCategoryRef.once("value",
            function(snapshot2) {
                snapshot2.forEach(potentialMatch=>{
                    if(!result){
                    //Check that didn't match previously with them
                    if (!userMatches.includes(potentialMatch.key)) {
                        if (genderPreference === potentialMatch.val().info.gender) {
                            //check if potential match matched with you
                            if (potentialMatch.val().matches!=undefined && potentialMatch.val().matches.userID != undefined) {
                                if (potentialMatch.val().matches.userID.group != 'NEGATIVE_MATCH') {
                                    console.log('RETURNING', potentialMatch.key)
                                    result = potentialMatch.key;
                                }
                            }
                            else {
                                console.log('RETURNING', potentialMatch.key)
                                result = potentialMatch.key;
                            }
                        }
                    }
                    }
                    else{
                        return;
                    }
                });
                if(result){
                    dispatch(getAnotherUser(result, 'candidate'))
                }
                else{
                    dispatch(getAnotherUserSuccess('', 'candidate'))
                }
            }
        )
    });
}

//This fn is responsible for doing checks after user "accepts" another user
// [x] If Nikkie is in Asher's "POSITIVE_MATCH" category, then put Asher in Nikkie's "MUTUAL_MATCH", and change Nikkie to "MUTUAL_MATCH" in Asher's
// [] If Nikkie is in Asher's "NEGATIVE_MATCH" category , then put Asher in Nikkie's "NEGATIVE_MATCH" category (supposedly never occurs - check)
// [x] If Nikkie is neither category yet, put Asher in Nikkie's "POSITIVE_MATCH" category
export const acceptMatch = (matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+'/matches/'+matchID);
    userCategoryRef.set({group: 'POSITIVE_MATCH'});
    let potentialMatchRef = firebase.database().ref('/users/'+matchID+'/matches/'+userID+'/group');
    potentialMatchRef.once('value', function(snapshot) {
        if (snapshot) {
            if (snapshot.val() === 'POSITIVE_MATCH') {
                userCategoryRef.set({group: 'MUTUAL_MATCH'});
                potentialMatchRef.parent.set({group: 'MUTUAL_MATCH'});
                dispatch(mutualMatch(true));
            }
            else{
                dispatch(getCandidate());
        }
    }
    });
};

/* Responsible for showing a mutual match screen */
export const mutualMatch = (bool) => ({
    type: MUTUAL_MATCH_SCREEN,
    bool
});

//This fn is responsible for doing the proper work after user "declines" another user: 
//[x] Put Asher in Nikkie's "NEGATIVE_MATCH" category and put Nikkie in Asher's "NEGATIVE_MATCH" category
export const declineMatch = (matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+'/matches/'+matchID);
    let potentialMatchRef = firebase.database().ref('/users/'+matchID+'/matches/'+userID);
    userCategoryRef.set({group: 'NEGATIVE_MATCH'});
    potentialMatchRef.set({group: 'NEGATIVE_MATCH'});
    dispatch(getCandidate());
};
