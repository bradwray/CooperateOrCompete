import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {connectToGame} from "./dataManager"




let styles = theme => ({
  container: {
    backgroundColor: "#0FA6BB",
    border: "22px dashed #6ED2E1",
    margin: "0 auto",
    width: "70vw",
    height: "100%",
    borderRadius: "5px",
    padding: "20px 0px 20px 0px"
  },
  textField: {
    width: "90%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: "#fff",
    marginBottom: "15px"
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
    voted: false,
    groupName: ""
  };

  componentWillMount = () => {
    connectToGame(this.props.match.params.code).then((result)=>{
        this.setState({
            gameCode: this.props.match.params.code,
            groupName: result
        });
    })

  };

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
    return (
      <div>
        <div>
          <div>
            <div className={classes.root}>
              <Typography variant="h5">Cooperate or compete?</Typography>
              <Typography variant="body2">Connected to group: {this.state.groupNames}</Typography>
              {!this.state.voted ? (
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-dense"
                    label="Name?"
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
                    Cooperate
                  </Button>
                  <span> or </span>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleCompete}
                  >
                    Compete
                  </Button>
                  <br />
                  <br />
                </form>
              ) : (
                <div>
                  <br />
                  <br />
                  <Typography variant="h3">
                    Your vote has been recorded.
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
