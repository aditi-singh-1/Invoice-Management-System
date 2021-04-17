import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import React, { Component, useEffect, useState } from "react";
import searchbar from "../../Actions/SearchbarAction";
import { useDispatch ,useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  searchbarinput: {
    width: "34.97vh",
    height: "4.6vh",
    border: "0.1vh solid #14AFF1",
    borderRadius: "0.5vh",
    paddingLeft: "2vh",
    margin: "0 3vh 0 1vh",
    backgroundColor: "#314653",
    outline: 0,
  },
}));

var SearchBarbtn = () => {
  const disp = useDispatch();
  const classes = useStyles();
  return (
    <SearchBar
    className={classes.searchbarinput}
    placeholder='Search by Bill ID'
    onChange={(newValue) => disp(searchbar(newValue))} //dispatching user input to the global store and will import in api call
    onRequestSearch={() =>console.log("searching")}
  />
  );
};

export default SearchBarbtn;