import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import RoundStats from "./roundStats"
import bg from "./bg.jpg"

const styles = {
   appBar: {
      position: 'relative',
      backgroundImage: `url(${bg})`
   },
   bg: {
      backgroundColor: "#6ED2E1",
      minHeight: "100vh",
      height: "100%"
   },
   close: {
      backgroundColor: "#124483",
      color: "#fff",
      left: "90%",
      "&:hover": {
         transform: "scale(1.2)",
         backgroundColor: "#ED6F22",
         color: "#fff"
      }
   }
};

function Transition(props) {
   return <Slide direction="up" {...props} />;
}

class StatDialog extends React.Component {
   state = {
      open: false,
   };

   componentWillReceiveProps = (nextProps) => {
      this.setState({ open: nextProps.open });
   }

   handleClickOpen = () => {
      this.setState({ open: true });
   };

   handleClose = () => {
      this.props.closeStats();
      this.setState({ open: false });
   };

   render() {
      const { classes } = this.props;
      return (
         <div>
            <Dialog
               fullScreen
               open={this.state.open}
               onClose={this.handleClose}
               TransitionComponent={Transition}
            >
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <Button className={classes.close} color="inherit" onClick={this.handleClose} aria-label="Close">
                        close
                     </Button>
                  </Toolbar>
               </AppBar>
               <div className={classes.bg}>
                  <RoundStats gameHistory={this.props.gameHistory} />
               </div>
            </Dialog>
         </div >
      );
   }
}

StatDialog.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatDialog);
