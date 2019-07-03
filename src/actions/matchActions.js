import firebase from './firebase';
import { USER_MATCH_UPDATE_SUCCESS, GET_MATCHES_SUCCESS, MUTUAL_MATCH_SCREEN, DELETE_ALL_MATCHES } from './types';
import {getAnotherUser, getAnotherUserSuccess} from './UserInfoActions'
const POSITIVE_MATCH = 'POSITIVE_MATCH';
const NEGATIVE_MATCH = 'NEGATIVE_MATCH';
const MUTUAL_MATCH = 'MUTUAL_MATCH';
const POTENTIAL_MATCH = 'POTENTIAL_MATCH'
const RECCOMENDED_MATCH = 'RECCOMENDED_MATCH'

//Initialzie the arrays for POS, NEG, MUT arrays and set a counter for potential matches.
//Later will also initialize the getMatches Function
export const initializeMatches = () => dispatch => {
    console.log("initializing matches")
    let userID = firebase.auth().currentUser.uid;
    let userRef = firebase.firestore().collection('users').doc(userID);
    let userInfo = {};
    userRef.get()
    .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
            let genderPreference =  doc.data().preferences.genderPreference;
            firebase.firestore().collection('users').where('info.gender', '==', genderPreference).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    userRef.update(userInfo); 
                    return;
                }
                else {
                    snapshot.forEach(doc => {
                        console.log('dispatch', doc.id);
                        dispatch(updateMatch(userRef, POTENTIAL_MATCH, doc.id));
                    });
                    userRef.update(userInfo);  
                }
            })
        }
    })
}

//Helper Functions
//These functions add/remove a new matchID from the match collection
const updateMatch = (ref, category, matchID, reccomendedBy) => dispatch => {
    console.log('UPDATING', category, matchID);
    let matchInfo = {};
    if (category==POTENTIAL_MATCH) {
        matchInfo['score'] = calculateScore(matchID);
    }
    if (reccomendedBy) {
        matchInfo[reccomendedBy] = reccomendedBy;
    }
    matchInfo['dateAdded'] = new Date();
    matchInfo['category'] = category;
    ref.collection('matches').doc(matchID).set(matchInfo)
    .then(function() {
        console.log("Match successfully Added!");
    })
    .catch(function(error) {
        console.error("Error adding Match: ", error);
    });
}

const deleteMatch = (ref, matchID) => {
    console.log('REMOVING', matchID);
    ref.collection('matches').doc(matchID).delete()
    .then(function() {
        console.log("Document successfully removed!");
    })
    .catch(function(error) {
        console.error("Error removing: ", category, error);
    });
}

//Check if the match is in a category and return the category
//Returns a promise to return the category
const getMatchCategory = (ref, matchID) => {
    console.log('getMatchCategory', matchID);
    return new Promise((resolve, reject) => {
        ref.collection('matches').doc(matchID).get()
        .then(doc => {
            if (doc.exists) {
                let data = doc.data();
                console.log('matchCategory', data, matchID);
                resolve(data.category);
            }
            resolve(POTENTIAL_MATCH);  
        })
    });
}
//Will later change to return a promise to the score. 
const calculateScore = (matchID) => {
    return 10;
}

//Given a matchID, put the match in the user's negative array and the user in the matches negative array
export const negativeMatch = (matchID) => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    console.log("NEGATIVE_MATCH", userID, matchID);
    let matchRef = firebase.firestore().collection('users').doc(matchID);
    let userRef = firebase.firestore().collection('users').doc(userID);
    updateMatch(userRef, NEGATIVE_MATCH, userID);
    updateMatch(matchRef, NEGATIVE_MATCH, matchID);
}

// //Given a userID, check if they are in the matches collection
// export const getPotential = (ref, docID) => dispatch => {
//     ref.collection(matches).doc(docID).get()
//       .then(doc => {
//         if (!doc.exists) {
//           return null;
//         } else {
//             console.log(doc.data());
//           return doc.data();
//         }
//       })
//       .catch(err => {
//         console.log('Error getting document', err);
//       });
// }

//Given a match that the user matched positively with, update the coorepsonding
//collections and documents
export const positiveMatch = (matchID) => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(matchID);
    let userRef = firebase.firestore().collection('users').doc(userID);
    console.log('positiveMatch', matchID);
    getMatchCategory(matchRef, userID)
    .then(matchCategory => {
        console.log('pos match', matchCategory);
        if (matchCategory === POSITIVE_MATCH) {
            updateMatch(userRef, MUTUAL_MATCH, matchID);
            updateMatch(matchRef, MUTUAL_MATCH, userID);
        }
        else {
            updateMatch(userRef, POSITIVE_MATCH, matchID);
            updateMatch(matchRef, POTENTIAL_MATCH, userID);
        }
    })
}

//Return the highest candidate in the potential list.
export const getCandidate = () => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(userID).collection('matches');
    let nextMatch = matchRef.where("category", "==", POTENTIAL_MATCH).orderBy('score').limit(1).onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
            if (doc.exists) {
                console.log('found candiddate', doc.id, doc.data());
                dispatch(getAnotherUser(doc.id, 'candidate'))
            }
            else {
                console.log('no matching candidates');
                dispatch(getAnotherUserSuccess(null, 'candidate'))
            }
        });
    })
}

//Get all ids of users currently in the mutual match category
export const getCurrentMatches = () => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(userID).collection('matches');
    matchRef.where("category", "==", MUTUAL_MATCH).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log('curMatch',doc.data());
            dispatch(getAnotherUser(doc.data(), 'matchesCards'))
        });
    })
    .catch(error => {
        console.log('no matching users')
        return;
    })
}

export const mutualMatch = (bool) => ({
    type: MUTUAL_MATCH_SCREEN,
    bool
});


//Matchmaker functions
export const reccomendedMatch = (otherID, matchID) => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(matchID);
    let otherRef = firebase.firestore().collection('users').doc(otherID);
    console.log('reccomendedMatch', matchID, otherID);
    getMatchCategory(matchRef, otherID)
    .then(matchCategory => {
        console.log('reccomended match', matchCategory);
        if (matchCategory === MUTUAL_MATCH) {
            return;
        }
        else {
            updateMatch(otherRef, RECCOMENDED_MATCH, matchID, userID);
            updateMatch(matchRef, RECCOMENDED_MATCH, otherID, userID);
        }
    })
}

/*Currently not being used */
// export const getMatchesSuccess = (matches) => ({
//     type: GET_MATCHES_SUCCESS,
//     matches,
// });

// export const deleteAllMatches = () => ({
//     type: DELETE_ALL_MATCHES,
// });

// /*Returns the id for the next candidate that matches gender preference and isn't already in your matches*/
// export const getCandidate = () => dispatch => {
//     console.log('GETTING CANDIDATE')
//     let user = firebase.auth().currentUser;
//     let userID = user.uid;
//     //Get database reference to current user
//     let getDoc = firebase.firestore().collection('users').doc(userID).get()
//       .then(doc => {
//         if (!doc.exists) {
//           console.log('No such document!');
//         } else {
//             let genderPreference =  doc.data().preferences.genderPreference;
//             console.log("check", doc.data());
//             let userMatchesFirestore = firebase.firestore().collection('users').doc(userID).collection('matches');
//             userMatchesFirestore.get()
//             .then(userMatches => {
//                 let userCategoryFirestore = firebase.firestore().collection('users');
//                 userCategoryFirestore.where('preference.genderPreference', '==', genderPreference).get()
//                 .then(snapshot => {
//                     if (snapshot.empty) {
//                         console.log('no matching candidates');
//                         dispatch(getAnotherUserSuccess(null, 'candidate'))
//                     }
//                     else {
//                         snapshot.forEach(potentialMatch => {
//                             if (!userMatches.includes(potentialMatch.id)) {

//                             }
//                             console.log(doc.id, '=>', doc.data());
//                         });
//                     }
//                 })
//             })
            
//             //Iterate over all users in the database (problem: should stop once it finds someone, but right now it doesnt. problem: shouldnt be alphabetical, should be random)
//             userCategoryRef.once("value",
//                 function(snapshot2) {
//                     snapshot2.forEach(potentialMatch=>{
//                         if(!result){
//                         //Check that didn't match previously with them
//                         if (!userMatches.includes(potentialMatch.key)) {
//                             if (genderPreference === potentialMatch.val().info.gender) {
//                                 //check if potential match matched with you
//                                 if (potentialMatch.val().matches!=undefined && potentialMatch.val().matches.userID != undefined) {
//                                     if (potentialMatch.val().matches.userID.group != 'NEGATIVE_MATCH') {
//                                         console.log('RETURNING', potentialMatch.key)
//                                         result = potentialMatch.key;
//                                     }
//                                 }
//                                 else {
//                                     console.log('RETURNING', potentialMatch.key)
//                                     result = potentialMatch.key;
//                                 }
//                             }
//                         }
//                         }
//                         else{
//                             return;
//                         }
//                     });
//                     if(result){
//                         dispatch(getAnotherUser(result, 'candidate'))
//                     }
//                     else{
//                         dispatch(getAnotherUserSuccess(null, 'candidate'))
//                     }
//                 }
//             )
//         }
//       })
//       .catch(err => {
//         console.log('Error getting document', err);
//       });



    // firebase.database().ref('/users/'+userID).once('value', function(snapshot) {
    //     let genderPreference =  snapshot.val().preferences.genderPreference;
    //     let userMatches = new Array();
    //     if(snapshot.val().matches){
    //         Object.keys(snapshot.val().matches).forEach(value=>{
    //             userMatches.push(value);
    //         });
    //     }
        // let userCategoryRef = firebase.database().ref('/users/');
        // //Iterate over all users in the database (problem: should stop once it finds someone, but right now it doesnt. problem: shouldnt be alphabetical, should be random)
        // userCategoryRef.once("value",
        //     function(snapshot2) {
        //         snapshot2.forEach(potentialMatch=>{
        //             if(!result){
        //             //Check that didn't match previously with them
        //             if (!userMatches.includes(potentialMatch.key)) {
        //                 if (genderPreference === potentialMatch.val().info.gender) {
        //                     //check if potential match matched with you
        //                     if (potentialMatch.val().matches!=undefined && potentialMatch.val().matches.userID != undefined) {
        //                         if (potentialMatch.val().matches.userID.group != 'NEGATIVE_MATCH') {
        //                             console.log('RETURNING', potentialMatch.key)
        //                             result = potentialMatch.key;
        //                         }
        //                     }
        //                     else {
        //                         console.log('RETURNING', potentialMatch.key)
        //                         result = potentialMatch.key;
        //                     }
        //                 }
        //             }
        //             }
        //             else{
        //                 return;
        //             }
        //         });
        //         if(result){
        //             dispatch(getAnotherUser(result, 'candidate'))
        //         }
        //         else{
        //             dispatch(getAnotherUserSuccess(null, 'candidate'))
        //         }
        //     }
        // )
    // });
// }

//This fn is responsible for doing checks after user "accepts" another user
// [x] If Nikkie is in Asher's "POSITIVE_MATCH" category, then put Asher in Nikkie's "MUTUAL_MATCH", and change Nikkie to "MUTUAL_MATCH" in Asher's
// [] If Nikkie is in Asher's "NEGATIVE_MATCH" category , then put Asher in Nikkie's "NEGATIVE_MATCH" category (supposedly never occurs - check)
// [x] If Nikkie is neither category yet, put Asher in Nikkie's "POSITIVE_MATCH" category
// export const acceptMatch = (matchID) => dispatch =>{
//     let user = firebase.auth().currentUser;
//     let userID = user.uid;
//     let userCategoryFirestore = firebase.firestore().collection('users').doc(userID).collection('matches').doc(matchID);
//     userCategoryFirestore.set({group: 'POSITIVE_MATCH'}, {merge: true});
//     let potentialMatchFirestore = firebase.firestore().collection('users').doc(matchID).collection('matches');
//     potentialMatchFirestore.get().then(function(doc) {
//         console.log('ACCEPTING', doc);
//         if (doc.exists) {
//             if (doc.data().userID.group) {
//                 if (doc.data().userID.group === 'POSITIVE_MATCH') {
//                     userCategoryFirestore.set({group: 'MUTUAL_MATCH'}, {merge: true});
//                     potentialMatchFirestore.set({userID: {group: 'MUTUAL_MATCH'}}, {merge: true});
//                     dispatch(mutualMatch(true));
//                 }
//                 else{
//                     dispatch(getCandidate());
//                 }   
//             }   
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     }).catch(function(error) {
//         console.log("Error getting document:", error);
//     });
// };

// /* Responsible for showing a mutual match screen */
// export const mutualMatch = (bool) => ({
//     type: MUTUAL_MATCH_SCREEN,
//     bool
// });

// //This fn is responsible for doing the proper work after user "declines" another user:
// //[x] Put Asher in Nikkie's "NEGATIVE_MATCH" category and put Nikkie in Asher's "NEGATIVE_MATCH" category
// export const declineMatch = (matchID) => dispatch =>{
//     let user = firebase.auth().currentUser;
//     let userID = user.uid;
//     let userCategoryRef = firebase.database().ref('/users/'+userID+'/matches/'+matchID);
//     let potentialMatchRef = firebase.database().ref('/users/'+matchID+'/matches/'+userID);
//     userCategoryRef.set({group: 'NEGATIVE_MATCH'});
//     potentialMatchRef.set({group: 'NEGATIVE_MATCH'});
//     dispatch(getCandidate());
// };
