import Button from "@material-ui/core/Button";
import React from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   button: {
      marginTop: 15,
      backgroundColor: "#124483",
      "&:hover": {
         transform: "scale(1.2)",
         backgroundColor: "#ED6F22",
         color: "#fff"
      }
   },
});

const WaitAndVote = (props) => {
   const { classes } = props;
   if (!props.roundOpen) {
      return (<div>{props.name} Wait for it</div>)
   }
   else {
      return (
         <div>
            <Button
               variant="contained"
               color="primary"
               className={classes.button}
               onClick={props.coop}
            >
               Cooperate
      </Button><br />
            <br />
            <span> or </span><br />
            <br />
            <Button
               variant="contained"
               color="primary"
               className={classes.button}
               onClick={props.comp}
            >
               Compete
      </Button>
            <br />
            <br />
         </div>)
   }
}

export default withStyles(styles)(WaitAndVote);