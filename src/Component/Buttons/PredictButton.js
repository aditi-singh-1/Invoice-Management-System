import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const UseStyles = makeStyles((theme) => ({
predictbutton: {
    background: "#97A1A9 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    opacity: 1,
    color:"#ffff",
},
}));

function predictButton(){
    const classes = UseStyles();
    return(
        <Button className={classes.predictbutton}>Predict</Button>
    )
}
export default predictButton;