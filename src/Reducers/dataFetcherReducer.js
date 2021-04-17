import actionLoad from '../Actions/actionLoad'

const addDataReducer = (state = { init: [] }, action) =>{
    switch(action.type){
        case "ADD_DATA":{
			return{...state, init:action.payload}};
        default:
            return state;
    }
}

export default addDataReducer;