import * as firebase from 'firebase';
import { config } from "./config.js"

//config function simply returns a config object snippet from the firebase project
firebase.initializeApp(config());

//Make a game and return the key of that game for the QR code
function makeGame(groupName) {
   let gameRefObj = firebase.database().ref("/games").push({ groupName: groupName });

   gameRefObj.child("currentRound").set({ roundOpen: false, roundNum: 1 })
   return gameRefObj.key
}

//Make a new round and return the key to collect the results and store as current round
function newRound(gameCode, roundNum) {
   let roundRefObj = firebase.database().ref("/games").child(gameCode)
   roundRefObj.child("rounds").child(roundNum).child("startTime").set(Date.now());
   roundRefObj.child("currentRound").set({ roundOpen: true, roundNum: roundNum });
}

function stopRound(gameCode, roundNum) {
   let roundRefObj = firebase.database().ref("/games").child(gameCode)
   roundRefObj.child("rounds").child(roundNum).child("endTime").set(Date.now());
   roundRefObj.child("currentRound").child("roundOpen").set(false);
}

function vote(coop, gameCode, roundNum) {

}

function connectToGame(code) {
   return firebase.database().ref("/games").child(code).child("groupName").once("value").then(result => {
      return result.val()
   })
}

export {
   makeGame,
   connectToGame,
   newRound,
   stopRound
}



