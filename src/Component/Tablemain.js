import Button from "./Buttons/buttonComp";
import Mytable from "./TableBody/Mytable";
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainbody:{
      height:"82vh",
      marginRight:"1rem",
      marginLeft:"1rem",
      backgroundColor:"#2D4250",
      display: "flex",
      flexDirection: "column",
  },
}));
//contains all button component and table is wrapped inside it
function Tablemain() {
  const classes = useStyles();
  return (
    <Paper className={classes.mainbody}>
                <Button />
                <Mytable/>
    </Paper>
  );
}
export default Tablemain;
