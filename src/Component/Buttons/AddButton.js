import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch ,useSelector } from "react-redux";
import addbtn from '../../Actions/Addbtn'
import AddDialogues from '../../Dialogues/AddDialogue'

const UseStyles = makeStyles((theme) => ({
    add:{
        border: "1px solid #14AFF1",
        borderRadius: "0.4rem",
        opacity: 1,
        color:"#ffff",
    },
}));
// this function will be called when the button gets clicked
function AddButton(){
    const classes = UseStyles();
    const disp = useDispatch();  

    var addbtnclicked = () =>{
        if(selectedId.size<=0){
            disp(addbtn());
        }
    };
    //selectedId returns the id of checkbox that gets checked
    const selectedId = useSelector((state)=>{
        return  state.BodyCheckBoxReducer.data
    });
    //its button's state if on or off
    const btnstate = useSelector((state)=>{
        return state.AddReducer.current;
    });
    console.log(btnstate);

    return(
        <>
        <Button className={classes.add} onClick={addbtnclicked}>Add</Button>
        {btnstate ? <AddDialogues /> : null}
        </>
    )
}
export default AddButton;