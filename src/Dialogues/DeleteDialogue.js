import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import deletebtn from '../Actions/DeletebtnAction';
import axios from "axios";
import App from '../App'

const useStyles = makeStyles((theme) => ({
  mainContent: {
    backgroundColor: "#2A3E4C",
    color: "white",
    border: "none",
    display: "flex",
  },
  insideContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    backgroundColor: "#2A3E4C",
    color: "#ffff",
    font: "normal normal normal 28px/32px Ubuntu",
  },
  footer: {
    backgroundColor: "#2A3E4C",
    display: "flex",
  },
  closeButton: {
    backgroundColor: "#2A3E4C",
    position: "absolute",
    color: "#ffff",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  cancelbtn: {
    textAlign: "left",
    font: "normal normal normal 20px/24px Ubuntu",
    letterSpacing: 0,
    color: " #14AFF1",
    opacity: 1,
    margin: "0 0 0.5rem 0.7rem",
  },
  clearbtn: {
    border: "1px solid #14AFF1",
    borderRadius: "0.5rem",
    textAlign: "left",
    font: "normal normal normal 20px/24px Ubuntu",
    letterSpacing: 0,
    color: "#FFFFFF",
    opacity: 1,
  },
  footerDivider: {
    flexGrow: 1,
  },
  rightbtns: {
    width: "37.5%",
    display: "flex",
    justifyContent: "space-between",
  },
  Addbtn: {
    background: " #14AFF1 0% 0% no-repeat padding-box",
    borderRadius: "0.5rem",
    textAlign: "left",
    font: "normal normal normal 20px/24px Ubuntu",
    letterSpacing: 0,
    color: "#FFFFFF",
    opacity: 1,
  },
  separate:{
    color:"blue",
  },
  textdesign:{
    color:"#C0C6CA",
    font: "normal normal normal 20px/24px Ubuntu",
  },
  headertext:{
    font: "normal normal normal 28px/32px Ubuntu",
  }
}));

export default function CustomizedDialogs() {
  const disp = useDispatch();
  const openclosestate = useSelector((state) => {
    return state.DeleteReducer.current;
  });

  var opendialogue = () => {
    return openclosestate;
  };
  var closedialogue = () => {
    disp(deletebtn());
  };

  
  const selectedId = useSelector((state)=>{
    return  state.BodyCheckBoxReducer.data
  }); //selecting the choice

  const idtodelete=[...selectedId]

  var deletedata = async ()=>{
    try{
      await axios.get(
        `http://localhost:8080/1806095/Delete?req=${idtodelete}`
      );
    }catch(error){
      console.log("Can't perform Delete.!")
    }
     closedialogue();
  }

  const classes = useStyles();
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={opendialogue}
      // maxWidth="l"
    >
      <DialogTitle id="customized-dialog-title" className={classes.title}>
        <Typography variant="h6" className={classes.headertext}>Delete Record(s)?</Typography>
        <IconButton
          aria-label="close"
          onClick={closedialogue}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <br className={classes.separate}/>
      <DialogContent dividers className={classes.mainContent}>
        <div>
          <Typography className={classes.textdesign} variant="h6">You'll lose your record(s) after this action. We can't recover them once you delete.</Typography>
          <br/>
          <Typography className={classes.textdesign} variant="h6">Are you sure you want to <span style={{color:"red"}}> permanently delete </span> them?</Typography>
        </div>
      </DialogContent>
      <DialogActions className={classes.footer}>
        <div className={classes.rightbtns}>
          <Button autoFocus onClick={closedialogue} className={classes.clearbtn}>
            <Typography variant="h6">Cancel</Typography>
          </Button>
          <Button autoFocus onClick={deletedata} className={classes.Addbtn}>
            <Typography variant="h6">Delete</Typography>
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
