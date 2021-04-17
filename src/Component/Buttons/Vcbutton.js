import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const UseStyles = makeStyles((theme) => ({
    vcbutton:{
        margin:"18px",
        border: "1px solid #14AFF1",
        borderRadius: "0.4rem",
        opacity: 1,
        color:"#ffff",
    },
}));



function Vcbutton(){
    const classes = UseStyles();
    return(
        <Button className={classes.vcbutton}>View Correspondence</Button>
    )
}
export default Vcbutton;