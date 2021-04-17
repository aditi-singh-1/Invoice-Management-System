import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import addData from "../../Actions/actionLoad";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import checkboxaction from '../../Actions/ActionCheckBox'
import Checkbox from '@material-ui/core/Checkbox';
import BodycheckboxAction from '../../Actions/ActionBodyCheckBox'

const useStyles = makeStyles((theme) => ({
  tablehead: {
    backgroundColor: "#2E4350",
    border: 0,
    textAlign: "left",
    font: "normal normal normal 19px/22px Ubuntu",
    letterSpacing: "0px",
    color: "#97A1A9",
    opacity: 1,
  },
  tableContainer:{
    overflow:"auto",
  },
  tablebodyrow: {
    border: 0,
    textAlign: "left",
    font: "normal normal normal 15px/17px Ubuntu",
    letterSpacing: "0px",
    color: "#FFFFFF",
  },
}));

export default function Mytable() {
  const dispatch = useDispatch();
  const classes = useStyles();
  let [responseData, setResponseData] = React.useState([]);  //this is local state to store table data recieved from backend
  let [isNext, isNextFunc] = React.useState(false);  //boolean state to specify if there's next data available or not for infinie scrolling
  let [pageCount, setCount] = React.useState(1);   //contain offset 
  let limit=15;
  var checkboxstorage = new Set();
  
   // for componentdidmount to load the data for the first time
  useEffect(()=>{
    fetchmoredata();
  },[])

   //fn to get the data from backend
  const fetchData = () => {
    axios
      .get(
        `http://localhost:8080/1806095/Retrieving_Data?Offset=${pageCount}&Limit=${limit}`
      )
      .then((response) => {
        setResponseData([...responseData, ...response.data]);
        setCount(pageCount + limit);
        isNextFunc(true);
      })
      .catch((error) => {
        console.log(error); 
      });
  };
   // function to get specific data for searched doc_id
  const fetchsearchdata = () =>{
    axios
      .get(
        `http://localhost:8080/1806095/Search?doc_id=${searchbardata}`
      )
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error); 
      });
  }
   //fn given inside infinte scrolling to search the data on basis if there is any user input in the search bar or not  
  const  fetchmoredata = () =>{
    if(searchbardata.length>3)
    {
      fetchsearchdata();
    }
    else{
      fetchData();
    }
  }

  //to change the color if clear date is greater than due date 
  var ClearDateColor = () => {
    for (var i of checkboxstorage) {
      var row = i.parentNode.parentNode;
      var clearDate = new Date(String(row.cells[6].innerHTML));
      var DueInDate = new Date(String(row.cells[5].innerHTML));
      if (clearDate - DueInDate > 0) {
        row.cells[6].style.color = "red";
      }
    }
  };

   //getting the id of every row and dispatching to the global storage
  var rowsgetter = () => {
    var row_idstorage = new Set();
    for (var x of checkboxstorage) {
      if (x.checked === true) {
        var row = x.parentNode.parentNode;
        var row_id = row.cells[3].innerHTML;
        row.style.backgroundColor = "#2A5368";
        row_idstorage.add(row_id);
      }
    }
    dispatch(BodycheckboxAction(row_idstorage));
  };

  //fn to implement select all feature
  var checkboxClicked  =()=>{
    rowsgetter(); // getting the checked rows
    dispatch(checkboxaction()); //dispatching the state of check boxes
    checkboxstorage.forEach((cbox) => {
      cbox.checked = !CheckBoxState;
    }); // changing the state of all the check boxes
  }
 

  var bodycheckboxClicked= () =>{
    rowsgetter();
  }

  // Use Selector 
  //retrieving the state of all checkbox from global storage
  const CheckBoxState = useSelector((state) => {
    return state.checkBoxReducer.current;
  });
 //retrieving the data given by the user in search bar
  const searchbardata = useSelector((state)=>{
    return state.searchBarReducer.initial;
  })
  // getting element of every check box
  const getcheckbox = () => {
    checkboxstorage = Array.from(document.getElementsByClassName("CheckBoxgetter"));
  };

  useEffect(() => {
    getcheckbox();
    ClearDateColor();
  }); 

  return (
    <TableContainer className={classes.tableContainer} id="scrollableDiv">
      <InfiniteScroll
      scrollableTarget="scrollableDiv"
      dataLength={responseData.length}
      next={fetchmoredata}
      hasMore={isNext}
      style={{ overflow: "unset !important" }}
      loader={
        <div style={{ height: "100%", paddingLeft: "50%", overflow: "hidden" }}>
          <CircularProgress color="secondary"/>
        </div>
      }
    > 
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tablehead}>
              <input type="checkbox" onClick={checkboxClicked}></input>
              {/* <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onChange={checkboxClicked} /> */}
            </TableCell>
            {responseData[0] &&
              Object.keys(responseData[0]).map((cellName) => (
                <TableCell key={cellName} className={classes.tablehead}>
                  {cellName}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((row) => (
            <TableRow>
              <TableCell className={classes.tablebodyrow}>
                <input type="checkbox" className="CheckBoxgetter" onClick={bodycheckboxClicked}></input>
                {/* <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onChange={bodycheckboxClicked} /> */}
              </TableCell>
              {Object.keys(row).map((cell) => (
                <TableCell className={classes.tablebodyrow}>
                  {row[cell]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
    </TableContainer>
  );
}
