import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

let styles = theme => ({
  container: {
    backgroundColor: "#eee",
    width: "100%",
    height: "100%"
  },
  textField: {
    width: "90%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: "#fff"
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

class StartGame extends React.Component {
  state = {
    voted: false
  };

  componentWillMount = () => {};
  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleCooperate = () => {
    this.setState({ voted: true });
  };

  handleCompete = () => {
    this.setState({ voted: true });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <div>
        <div>
          <div>
            <div className={classes.root}>
              <Typography variant="h5">Cooperate or Compete</Typography>
              <Typography variant="body2">
                Begin a game with your class?
              </Typography>
              {!this.state.voted ? (
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
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
                    onClick={this.handleCooperate}
                  >
                    Create New Game
                  </Button>

                  <br />
                  <br />
                </form>
              ) : (
                <div>
                  <br />
                  <br />
                  <Typography variant="h3">
                    Join Code: 
                  </Typography>
                  <br />
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
