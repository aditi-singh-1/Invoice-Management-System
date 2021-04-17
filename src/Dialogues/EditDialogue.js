import React from "react";
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
import editbtn from "../Actions/EditbtnAction";
import { useDispatch, useSelector } from "react-redux";
import addrowtoDB from "../Actions/Addbtndata";
import axios from "axios";

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
    width: "40%",
    display: "flex",
    justifyContent: "space-between",
  },
  Addbtn: {
    background: " #14AFF1 0% 0% no-repeat padding-box",
    borderRadius: "0.5rem",
    opacity: 1,
    width: "5rem",
    height: "2.5rem",
    font: "normal normal normal 20px/24px Ubuntu",
    letterSpacing: 0,
    color: "#FFFFFF", 
  },
  rightcontent: {
    border: "1px solid yellow",
  },
  leftcontent: {
    border: "1px solid red",
  },
  feild: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0.5rem",
    marginLeft: "1rem",
  },
  inputfeild: {
    background: "#283A46 0% 0% no-repeat padding-box",
    border: "1px solid #356680",
    borderRadius: "0.5rem",
    opacity: 1,
    width: "30vh",
    height: "3.5vh",
    outline: 0,
  },
  notesinputfeild: {
    width: "30vh",
    height: "12vh",
    background: "#283A46 0% 0% no-repeat padding-box",
    border: "1px solid #356680",
    borderRadius: "0.5rem",
    opacity: 1,
    outline: 0,
  },
  Resetbtn:{
    border: "1px solid #14AFF1",
    borderRadius: "10px",
    opacity: 1,
    width: "5rem",
    height: "2.5rem",
    font: "normal normal normal 20px/24px Ubuntu",
    letterSpacing: 0,
    color: "#FFFFFF", 
  }
}));

export default function CustomizedDialogs() {
  const disp = useDispatch();
  const openclosestate = useSelector((state) => {
    return state.AddReducer.current;
  });
  
  var opendialogue = () => {
    return openclosestate;
  };
  var closedialogue = () => {
    disp(editbtn());
  };

  var selectedId = useSelector((state)=>{
    return  state.BodyCheckBoxReducer.data
  });
  var axioscall = async ()=>{
    try{
      await axios.get(
        `http://localhost:8080/1806095/Edit?amount=${inv_amt}&notes=${notes}&doc_id=${id}`
      );
    }catch(error){
      console.log("Can't perform Delete.!")
    }
     closedialogue();
  }

  var editdata =()=>{
    getdata();
    axioscall();
    closedialogue();
  }
  var inv_amt="";
  var notes="";
  var id="";
  var getdata = ()=>{
    inv_amt=document.getElementById("inv_amt").value;
    notes= document.getElementById("notes").value;
    selectedId.forEach((elem)=>{
    id+=elem;
  })
    console.log(id);
  }

  var cleardata = () => {
    document.getElementById("inv_amt").value = "";
    document.getElementById("notes").value = "";
  };

  const classes = useStyles();
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={opendialogue}
      
    >
      <DialogTitle id="customized-dialog-title" className={classes.title}>
        <Typography variant="h6">Edit Invoice</Typography>
        <IconButton
          aria-label="close"
          onClick={closedialogue}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.mainContent}>
        <div>
          <div className={classes.feild}>
            <Typography variant="h6">Invoice Amount </Typography>
            <input type="text" id="inv_amt" className={classes.inputfeild} />
          </div>
          <div className={classes.feild}>
            <Typography variant="h6">Notes </Typography>
            <input type="text" id="notes" className={classes.notesinputfeild} />
          </div>
        </div>
      </DialogContent>
      <DialogActions className={classes.footer}>
        <Button onClick={closedialogue} className={classes.cancelbtn}>
          <Typography variant="h6">Cancel</Typography>
        </Button>
        <div className={classes.footerDivider} />
        <div className={classes.rightbtns}>
        <Button autoFocus onClick={cleardata} className={classes.Resetbtn}>
            <Typography variant="h6">Reset</Typography>
          </Button>
          <Button autoFocus onClick={editdata} className={classes.Addbtn}>
            <Typography variant="h6">Save</Typography>
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
