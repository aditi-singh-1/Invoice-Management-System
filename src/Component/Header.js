import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {ReactComponent as CompanyLogo} from '../Assets/Group20399.svg'
import {ReactComponent as LogoComp} from '../Assets/logo.svg'
const useStyles = makeStyles((theme) => ({
    appbar:{
        boxShadow:"none",
        backgroundColor:"#3D4D62",
        width:"100vw",
        marginTop:"0.5rem"
    },
    gap:{
      width:"22%"
    },
    headerName: {
        color: "white",
        font: "normal normal normal 1.75rem/2rem Ubuntu !important",
        marginLeft:"1.5rem",
        marginBottom:"1rem",
    },
    logos:{
        marginBottom:"1rem"
    }
}));
// this function is for header which contains hrc logo, abc and its logo and title
function Header() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar className={classes.logos}>
        <CompanyLogo/>
        <div className={classes.gap}></div>
        <LogoComp/>
      </Toolbar>
      <Typography className={classes.headerName}>
        Invoice List
      </Typography>
    </AppBar>
  );
}
export default Header;