import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EditDialogue from '../../Dialogues/EditDialogue'
import { useDispatch ,useSelector } from "react-redux";
import editbtn from '../../Actions/EditbtnAction'

const UseStyles = makeStyles((theme) => ({
    edit:{
        border: "1px solid #97A1A9",
        borderRadius: "0.4rem",
        opacity: 1,
        color:"#ffff"
    },
}));
function EditButton(){
    const disp = useDispatch();

    var editbtnclicked = () =>{
        if(selectedId.size==1)
        {
            disp(editbtn());
        }
    };

    const selectedId = useSelector((state)=>{
        return  state.BodyCheckBoxReducer.data
    });
    
    const editbtnstate = useSelector((state)=>{
        return state.EditReducer.current;
    });
    console.log("edit btn ka sate:::",editbtnstate);
    const classes = UseStyles();
    return(
        <>
            <Button className={classes.edit} onClick={editbtnclicked}>Edit</Button>
            {editbtnstate ? <EditDialogue /> : null}
        </>
    )
}
export default EditButton;