import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ClassSharp } from '@material-ui/icons';
import PredictButton from './PredictButton';
import Vcbutton from './Vcbutton';
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import SearchBarbtn from './SearchBar'

const UseStyles = makeStyles((theme) => ({
    legtbuttons:{
        margintop:"19px",
        top: "180px",
        left: "60px",
        width: "383px",
        height: "67px",
        opacity:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    outerheader:{
        width: "100%",
        display: "flex",
        justifyContent:"space-between",
    },
    rightfuncs:{
        width:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    add:{
        border: "1px solid #14AFF1",
        borderRadius: "0.4rem",
        opacity: 1,
    },
    rightbuttons:{
        width:"50%",
        display:"flex",
        justifyContent:"space-evenly",

    },
    searchbar:{
        background:" #283A46 0% 0% no-repeat padding-box",
        border: "1px solid #14AFF1",
        borderRadius: "0.4rem",
        opacity: 1,
    },
    
  }));

  // contains all buttons , we have imported it in tablemain

function buttonComp(props){
    const classes = UseStyles(); //this is a style react hook and classes is refering it
    return(
        <div className={classes.outerheader}>
            <div className={classes.legtbuttons}>
                <PredictButton/>
                <div className={classes.vcbox}>    
                    <Vcbutton/>
                </div>
            </div>
            <div className={classes.rightfuncs}>
                <div className={classes.rightbuttons}>
                    <AddButton/>
                    <EditButton/>
                    <DeleteButton/>
                </div>
                <div className={classes.searchbardiv}>
                    <SearchBarbtn/>
                </div>
            </div>
        </div>
    );
}
export default buttonComp;