import Button from "@material-ui/core/Button";
import React from "react";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
   button: {
      marginTop: 15,
      backgroundColor: "#124483",
      "&:hover": {
         transform: "scale(1.2)",
         backgroundColor: "#ED6F22",
         color: "#fff"
      }
   },
   textField: {
      width: "90%",
      backgroundColor: "#fff",
      marginBottom: "15px",
      borderRadius: "4px"
   },
});

const NameEntry = (props) => {
   const { classes } = props;
   return (
      <div>
         <TextField
            id="outlined-dense"
            label="Name?"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="filled"
            onChange={props.handleNameText}
         />
         <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.handleSubmit}
         >
            Submit
      </Button>
      </div>)
}

export default withStyles(styles)(NameEntry);