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
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from "@material-ui/icons/Close";
import addbtn from "../Actions/Addbtn";
import { useDispatch, useSelector } from "react-redux";
import addrowtoDB from '../Actions/Addbtndata'
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
    justifyContent:"space-between"
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
    width: "30%",
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
  rightcontent:{
      border:"1px solid yellow"
  },
  leftcontent:{
    border:"1px solid red"
  },
    feild:{
      display:"flex",
      justifyContent:"space-between",
      margin:"0.5rem",
      marginLeft:"1rem",
  },
  inputfeild:{
    background: "#283A46 0% 0% no-repeat padding-box",
    border: "1px solid #356680",
    borderRadius: "0.5rem",
    opacity: 1,
    width: "30vh",
    height: "3.5vh",
    outline:0,
  },
  notesinputfeild:{
    width: "30vh",
    height: "12vh",
    background: "#283A46 0% 0% no-repeat padding-box",
    border: "1px solid #356680",
    borderRadius: "0.5rem",
    opacity: 1,
    outline:0,
  },
}));
//
export default function CustomizedDialogs() {
  const [selectedDate, setSelectedDate] = React.useState(new Date()); //this is used to select date from calendar
  const disp = useDispatch();
  const openclosestate = useSelector((state) => {
    return state.AddReducer.current;
  }); //getting current state of add button from reducer

  //these functions are used to open the dialouge and close them
  var opendialogue = () => {
    return openclosestate;
  }; 
  var closedialogue = () => {
    disp(addbtn());
  };

  //passing the chosed date to the state
  var Dateselect = (choosedDate)=>{
    setSelectedDate(choosedDate)
  };
  // fn to call the API when add button gets clicked
  var axioscall = async ()=>{
    try{
      await axios.get(
        `http://localhost:8080/1806095/Add?cust_number=${data[0]}&name_customer=${data[1]}&doc_id=${data[2]}&total_open_amount=${data[3]}&due_in_date=${data[4]}&notes=${data[5]}`
      );
    }catch(error){
      console.log("Can't perform Delete.!")
    }
     closedialogue();
  }
  // fn to convert the date picker format to req format
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  let data = [];
  var getdata = ()=>{
    data.push(document.getElementById("cust_name").value);
    data.push(document.getElementById("cust_no").value);
    data.push(document.getElementById("inv_no").value);
    data.push(document.getElementById("inv_amt").value);
    data.push(convert(selectedDate));
    data.push(document.getElementById("notes").value);
    console.log(data);
    disp(addrowtoDB(data));
  }

  var cleardata=()=>{
    document.getElementById('cust_name').value=null;
    document.getElementById('cust_no').value=null;
    document.getElementById('inv_no').value=null;
    document.getElementById('inv_amt').value=null;
    document.getElementById('notes').value=null;
    setSelectedDate(1/1/2000);
  }
   //when user click Add button this will pop
  var sendData=()=>{
    getdata();
    axioscall();
    closedialogue();
  }

  const classes = useStyles();
  return (
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={opendialogue}
        maxWidth="l" 
      >
        <DialogTitle id="customized-dialog-title" className={classes.title}>
          <Typography variant="h6">Add Invoice</Typography>
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
                <div className={classes.insideContent}>
                    <div className={classes.feild}>
                        <Typography variant="h6">Customer Name </Typography>
                        <input type="text" Id="cust_name" className={classes.inputfeild} />
                    </div>
                    <br/>
                    <div className={classes.feild}>
                        <Typography variant="h6">Customer No. </Typography>
                        <input type="text" id="cust_no"className={classes.inputfeild} />
                    </div>
                    <br/>
                    <div className={classes.feild}>
                        <Typography variant="h6">Invoice No. </Typography>
                        <input type="text" id="inv_no"className={classes.inputfeild}/>
                    </div>
                    <br/>
                    <div className={classes.feild}>
                        <Typography variant="h6">Invoice Amount </Typography>
                        <input type="text" id="inv_amt" className={classes.inputfeild} />
                    </div>
                </div>
            </div>
            <div>
                <div className={classes.insideContent}>
                        <div className={classes.feild}>
                            <Typography variant="h6">Due Date </Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              value={selectedDate}
                              onChange={Dateselect}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={classes.feild}>
                            <Typography variant="h6">Notes </Typography>
                            <input type="text" id="notes" className={classes.notesinputfeild}/>
                        </div>
                </div>
            </div>
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button onClick={closedialogue} className={classes.cancelbtn}>
            <Typography variant="h6">Cancel</Typography>
          </Button>
          <div className={classes.footerDivider} />
          <div className={classes.rightbtns}>
            <Button
              autoFocus
              onClick={cleardata}
              className={classes.clearbtn}
            >
              <Typography variant="h6">Clear</Typography>
            </Button>
            <Button
              autoFocus
              onClick={sendData}
              className={classes.Addbtn}
            >
              <Typography variant="h6">Add</Typography>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
  );
}
