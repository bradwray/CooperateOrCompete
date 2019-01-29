import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import QR from "qrcode.react";
import { makeGame } from "./dataManager"

let QRsize = window.innerWidth / 3

let styles = theme => ({
   container: {
      backgroundColor: "#0FA6BB",
      border: "22px dashed #6ED2E1",
      margin: "0 auto",
      width: "70vw",
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

class StartGame extends React.Component {
   state = {
      begun: false
   };

   componentWillMount = () => { };

   handleChange = event => {
      this.setState({
         name: event.target.value
      });
   };

   handleMake = () => {
      let code = makeGame(this.state.name)
      this.setState({
         begun: true,
         gameCode: code
      });
   };

   render() {
      const { classes } = this.props;
      let url = "https://3000-ba596077-8c86-47e6-b1ab-679e7a0fd32d.ws-us.gitpod.io/" + this.state.gameCode
      
      return (
         <div>
            <div>
               <div>
                  <div className={classes.root}>
                     <Typography style={{ color: "#124483" }} variant="h2">Cooperate or Compete</Typography><br />
                     {!this.state.begun ? (
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
                              variant="outlined"
                              onChange={this.handleChange}
                           />

                           <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={this.handleMake}
                           > Create New Game</Button>

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
                                 size={QRsize}
                                 value={url}
                              />
                           </div>
                        )}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

StartGame.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StartGame);
