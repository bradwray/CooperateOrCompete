import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as firebase from 'firebase';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import QR from "qrcode.react";
import { makeGame, newRound, stopRound } from "./dataManager"
import StatDialog from "./StatDialog.js"

let QRsize = window.innerWidth / 5

let styles = theme => ({
   container: {
      backgroundColor: "#0FA6BB",
      border: "22px dashed #6ED2E1",
      margin: "0 auto",
      width: "65vw",
      height: "100%",
      padding: "20px 0px 20px 0px"
   },
   textField: {
      width: "86%",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      backgroundColor: "#fff",
      borderRadius: "4px",
   },
   qr: {
      width: "50vw"
   },
   dense: {
      marginTop: 16
   },
   menu: {
      width: 200
   },
   root: {
      flexGrow: 1
   },
   button: {
      marginTop: 15,
      margin: "15px 15px 15px 15px",
      backgroundColor: "#124483",
      "&:hover": {
         transform: "scale(1.2)",
         backgroundColor: "#ED6F22",
         color: "#fff"
      }
   },
   timeBar: {
      color: "#00695C",
      bottom: "450px"
   },
   cssLabel: {
      '&$cssFocused': {
         color: "#f00",
      },
   },
   cssFocused: {},
   cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
         borderColor: "#f00",
      }
   }

});

class GameRunner extends React.Component {
   state = {
      gameMade: false,
      roundNum: 1,
      gameHistory: [],
      statsOpen: false
   };

   componentWillMount = () => {

   };

   listenToRounds = (gameCode) => {
      firebase.database().ref("/games").child(gameCode).child("currentRound").on("value", (snap) => {
         this.setState({
            roundOpen: snap.val().roundOpen ? snap.val().roundOpen : false,
            roundNum: snap.val().roundNum ? snap.val().roundNum : 1
         });
      })
   }

   handleChange = event => {
      this.setState({
         name: event.target.value
      });
   };

   handleMake = () => {
      let code = makeGame(this.state.name)
      this.setState({
         gameMade: true,
         gameCode: code
      });
      setTimeout(() => {
         this.listenToRounds(code)
      }, 1000)

   };

   handleNewRound = () => {
      newRound(this.state.gameCode, this.state.roundNum)
      this.setState({
         roundStart: Date.now()
      });
   }

   handleRoundEnd = () => {
      stopRound(this.state.gameCode, this.state.roundNum).then((result) => {
         let tempArr = this.state.gameHistory;
         let votes = result.votes != null ? Object.values(result.votes, []) : []
         tempArr[this.state.roundNum - 1] = {
            forRound: this.state.roundNum,
            votes: votes,
            coopPercent: votes.filter((i) => { return i.vote === "cooperate" }) / votes.length
         }

         this.setState({
            statsOpen: true,
            roundNum: this.state.roundNum + 1,
            gameHistory: tempArr
         });
      })
   }

   closeStats = () => {
      this.setState({
         statsOpen: false,
      });
   }

   checkWinners = (cooperators, competitors, numWinners) => {
      if (competitors.length != 0) {
         return competitors.map((i) => {
            return i.name
         })
      }
      else {
         return cooperators.map((i) => {
            return i.name
         })
      }
   }

   render() {
      const { classes } = this.props;
      let url = "https://3000-ba596077-8c86-47e6-b1ab-679e7a0fd32d.ws-us0.gitpod.io/" + this.state.gameCode

      return (
         <div>
            <div>
               <div>
                  <div className={classes.root}>
                     <Typography style={{ color: "#124483" }} variant="h2">Cooperate or Compete</Typography><br />
                     {!this.state.gameMade ? (
                        <form
                           className={classes.container}
                           noValidate
                           autoComplete="off"
                        >
                           <Typography style={{ color: "#124483" }} variant="h5">
                              Begin a game with your class?</Typography>
                           <TextField
                              id="outlined-dense"
                              label="Class name?"
                              className={classNames(classes.textField, classes.dense)}
                              margin="dense"
                              variant="filled"
                              onChange={this.handleChange}
                           />

                           <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={this.handleMake}
                           >Create New Game</Button>

                           <br />
                           <br />
                        </form>
                     ) : (
                           <div>
                              <br />
                              <br />
                              <Typography variant="h5">Dear players, please scan this.</Typography>
                              <br />
                              <QR
                                 className={classes.qr}
                                 size={QRsize}
                                 value={url}
                              /><br />
                              <Button
                                 variant="contained"
                                 color="primary"
                                 className={classes.button}
                                 disabled={this.state.roundOpen ? true : false}
                                 onClick={this.handleNewRound}
                              >Begin Round #{this.state.roundNum}</Button>

                              <Button
                                 variant="contained"
                                 color="primary"
                                 disabled={this.state.roundOpen ? false : true}
                                 className={classes.button}
                                 onClick={this.handleRoundEnd}
                              >End Round #{this.state.roundNum}</Button>
                           </div>
                        )}
                     <StatDialog open={this.state.statsOpen} closeStats={this.closeStats} gameHistory={this.state.gameHistory} />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

GameRunner.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameRunner);
