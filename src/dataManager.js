import * as firebase from 'firebase';
import {config} from "./config.js"

firebase.initializeApp(config());

//Make a game and return the key of that game for the QR code
function makeGame(groupName){
    let gameRefObj = firebase.database().ref("/games").push({groupName: groupName});
    return gameRefObj.key
}

//Make a new round and return the key to collect the results and store as current round
function newRound(gameCode, roundNum){
    let roundRefObj = firebase.database().ref("/games").child(gameCode).child("rounds").push({roundNum: roundNum});
    return roundRefObj.key
}

function readGame(groupName){
    firebase.database().ref("/games").on(groupName);
}

export {
      makeGame
    }



