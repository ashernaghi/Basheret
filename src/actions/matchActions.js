import * as firebase from 'firebase';
import { USER_MATCH_UPDATE_SUCCESS, GET_MATCHES_SUCCESS, POSITIVE_MATCH, NEGATIVE_MATCH, MUTUAL_MATCH } from './types';
import {getAnotherUser} from './UserInfoActions'

export const userMatchUpdateSuccess = (category, matchId) => ({
    type: USER_MATCH_UPDATE_SUCCESS,
    category,
    matchId
});

//Remove the cooresponding category a user is in
export const removeMatch = (category, matchID) => dispatch =>{
    console.log("removing"+category+matchID);
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.remove();
};

export const getMatchesSuccess = (matches) => ({
    type: GET_MATCHES_SUCCESS,
    matches,
});

//Returns a list of User IDs for the cooresponding category - not currently using this since all the matches come in with user on load
export const getMatches = (category) => dispatch =>  {
    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID+"/matches");
        userFirebase.orderByChild("group").equalTo(category).on("value", 
            function(snapshot) {
               let matches = new Array();
                snapshot.forEach(value=>{
                    matches.push(value.key);
                });
            getMatchesSuccess(matches)
        });
    }
}

export const getCandidateSuccess = (candidate) => ({
    type: GET_MATCHES_SUCCESS,
    matches,
});

//Get next candidate, returns the id for the next candidate that isn't the same gender and isn't already in your matches. 
//Return empty string if none. 
export const getCandidate = () => dispatch => {
    console.log('GETTING CANDIDATE')
    let result;
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    //Get database reference to current user
    firebase.database().ref('/users/'+userID).on('value', function(snapshot) {
        console.log(snapshot);
        let userGender =  snapshot.val().info.gender;
        let userMatches = new Array();
        Object.keys(snapshot.val().matches).forEach(value=>{
            userMatches.push(value.key);
        });
        let userCategoryRef = firebase.database().ref('/users/');
        //Iterate over all users in the database (problem: should stop once it finds someone, but right now it doesnt)
        userCategoryRef.on("value",
            function(snapshot2) {
                snapshot2.forEach(potentialMatch=>{
                    if(!result){
                    //Check that didn't match previously with them
                    if (!userMatches.includes(potentialMatch.key)) {
                        if (userGender != potentialMatch.val().info.gender) {
                            //check if potential match matched with you
                            if (potentialMatch.val().matches!=undefined && potentialMatch.val().matches.userID != undefined) {
                                if (potentialMatch.val().matches.userID.group != 'never') {
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
                dispatch(getAnotherUser(result, 'candidate'))
                // return result || '';
            }
        )
    });
}

//right now these fns are just adding/removing from a single user's account. needs to happen across two accounts (user and candidate)

//Categories are from the types file

//This fn should be responsible for doing checks after user "accepts" another user
// -> Is Nikkie in Asher's "potential" category? If so, put Asher in Nikkie's "matches", put Nikkie in Asher's "matches", and remove Nikkie from Asher's "potential"

// -> If Nikkie is in Asher's "never" category , then put Asher in Nikkie's "never" category
//This one will never occur, the getCandidate function only shows people who didn't swipe no on you.
// -> If Nikkie is neither category yet, put Asher in Nikkie's "potential" category
//This one isn't necessary, I don't think we need the potential category at this point but might want it in the future.
export const acceptMatch = (matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+'/matches/'+matchID);
    userCategoryRef.set({group: POSITIVE_MATCH});
    let potentialMatchRef = firebase.database().ref('/users/'+matchID+'/matches/'+userID+'/group');
    potentialMatchRef.once('value', function(snapshot) {
        console.log('testing');
        console.log(snapshot);
        if (snapshot) {
            if (snapshot.val() === POSITIVE_MATCH) {
                userCategoryRef.set({group: MUTUAL_MATCH});
                potentialMatchRef.set({group: MUTUAL_MATCH});
            }
        }
        dispatch(userMatchUpdateSuccess(matchID));
    });
};

//This fn is responsible for doing the proper work after user "declines" another user: 
// -> Put Asher in Nikkie's "never" category
// -> Put Nikkie in Asher's "never" category
// -> Remove Nikkie from Asher's "potential" category if she is in there
//This may be needed in the future, but not yet
export const declineMatch = (matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+'/matches/'+matchID);
    let potentialMatchRef = firebase.database().ref('/users/'+matchID+'/matches/'+userID);
    userCategoryRef.set({group: NEGATIVE_MATCH});
    potentialMatchRef.set({group: NEGATIVE_MATCH});
};
