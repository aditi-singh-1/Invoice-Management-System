import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteDialogue from '../../Dialogues/DeleteDialogue';
import deletebtn from '../../Actions/DeletebtnAction'
import { useDispatch ,useSelector } from "react-redux";


const UseStyles = makeStyles((theme) => ({
    delete:{
        border: "1px solid #14AFF1",
        borderRadius: "0.4rem",
        opacity: 1,
        color:"#ffff",
    }
}));

function DeleteButton(){                                         
    const classes = UseStyles();
    const disp = useDispatch();

    var deletebtnclicked = () =>{
        if(selectedId.size>0)
        {
            disp(deletebtn());
        }
    };

    const deletetbtnstate = useSelector((state)=>{
        return state.DeleteReducer.current;
    });

    const selectedId = useSelector((state)=>{
        return  state.BodyCheckBoxReducer.data
    });

    return(
        <>
            <Button className={classes.delete} onClick={deletebtnclicked}>Delete</Button>
            {deletetbtnstate && selectedId.size>0 ? <DeleteDialogue /> : null}
        </>
    )
}
export default DeleteButton;