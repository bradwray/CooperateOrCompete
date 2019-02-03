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

async function stopRound(gameCode, roundNum) {
   let roundRefObj = firebase.database().ref("/games").child(gameCode)
   roundRefObj.child("rounds").child(roundNum).child("endTime").set(Date.now());
   roundRefObj.child("currentRound").child("roundOpen").set(false);
   try {
      let data = await getRelevantData("/games/" + gameCode + "/rounds/" + roundNum, ["coop", "comp", "startTime"])
      return data
   } catch (err) {
      console.log(err)
   }
}


function vote(choice, gameCode, roundNum, name) {
   let voteRefObj = firebase.database().ref("/games").child(gameCode)
   if (choice === "cooperate") {
      voteRefObj.child("rounds").child(roundNum).child("coop").push({ name: name })
   }
   else if (choice === "compete") {
      voteRefObj.child("rounds").child(roundNum).child("comp").push({ name: name, time: Date.now() })
   }
}

function connectToGame(code, name) {
   let connectRef = firebase.database().ref("/games").child(code)
   return connectRef.child("groupName").once("value").then(result => {
      return result.val()
   })
}

function joinGame(code, name) {
   let joinRef = firebase.database().ref("/games").child(code)
   joinRef.child("players").push(name)
}

function getRelevantData(ref, keys) {
   return new Promise((fulfill, reject) => {
      let refObj = firebase.database().ref(ref);
      let current = 0;
      let endResult = {};
      for (let i = 0; i < keys.length; i++) {
         refObj.child(keys[i]).once('value').then(snap => {
            if (snap.exists()) {
               endResult[keys[i]] = snap.val();
            } else {
               endResult[keys[i]] = null;
            }
            current++;
            if (current === keys.length) {
               fulfill(endResult);
            }
         }).catch((err) => {
            reject(err);
         });
      }
   });
}


export {
   makeGame,
   connectToGame,
   newRound,
   stopRound,
   vote,
   joinGame
}



