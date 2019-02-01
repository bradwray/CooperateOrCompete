import React from "react";
import PropTypes from "prop-types";
import * as firebase from 'firebase';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connectToGame } from "./dataManager"
import WaitAndVote from "./waitAndVote.js"
import NameEntry from "./nameEntry.js"

let styles = () => ({
   container: {
      backgroundColor: "#0FA6BB",
      border: "22px dashed #6ED2E1",
      margin: "0 auto",
      width: "60vw",
      height: "100%",
      padding: "20px 0px 20px 0px"
   },
   textField: {
      width: "90%",
      backgroundColor: "#fff",
      marginBottom: "15px",
      borderRadius: "4px"
   },
   button: {
      backgroundColor: "#124483",
      "&:hover": {
         transform: "scale(1.2)",
         backgroundColor: "#ED6F22",
         color: "#fff"
      }
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
   timeBar: {
      color: "#00695C",
      bottom: "20px"
   },
   colorPrimary: {
      backgroundColor: "#B2DFDB"
   },
   barColorPrimary: {
      backgroundColor: "#00695C"
   },
   expired: {
      backgroundColor: "#f00",
      width: "100%",
      height: "600px"
   }
});

class Play extends React.Component {
   state = {
      WaitAndVoted: false,
      groupName: "",
      nameEntered: false,
      roudOpen: false
   };

   componentWillMount = () => {
      connectToGame(this.props.match.params.code).then((result) => {
         this.setState({
            gameCode: this.props.match.params.code,
            groupName: result
         });
      })

      firebase.database().ref("/games").child(this.props.match.params.code).child("currentRound").on("value", (snap) => {
         this.setState({
            roundOpen: snap.val().roundOpen,
            roundNum: snap.val().roundNum
         });
      })
   };

   handleNameText = event => {
      this.setState({
         name: event.target.value
      });
   };

   handleCooperate = () => {
      this.setState({
         voted: true,
         roundOpen: false
      });
   };

   handleCompete = () => {
      this.setState({
         voted: true,
         roundOpen: false
      });
   };

   handleSubmit = () => {
      this.setState({ nameEntered: true });
   }

   render() {
      const { classes } = this.props;
      return (
         <div>
            <div>
               <div>
                  <div className={classes.root}>
                     <Typography style={{ color: "#124483" }} variant="h2">Cooperate or Compete</Typography><br />
                     <Typography variant="body2">Connected to group: {this.state.groupName}</Typography>
                     {!this.state.voted ? (
                        <form
                           className={classes.container}
                           noValidate
                           autoComplete="off"
                        >
                           {this.state.nameEntered ?
                              <WaitAndVote
                                 coop={this.handleCooperate}
                                 comp={this.handleCompete}
                                 roundOpen={this.state.roundOpen}
                                 name={this.state.name} />
                              : <NameEntry handleSubmit={this.handleSubmit} handleNameText={this.handleNameText} />}
                        </form>
                     ) : (
                           <div>
                              <br />
                              <br />
                              <Typography variant="h3">
                                 Your WaitAndVote has been recorded.
                  </Typography>
                              <br />
                           </div>
                        )}

                  </div>
               </div>
               <div />
            </div>
         </div>
      );
   }
}

Play.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Play);
