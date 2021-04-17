const searchBarReducer = (state = {initstate:false, initial: [] }, action) =>{
    switch(action.type){
        case "SEARCH_BAR":{
			return{...state, initial:action.payload}};
        default:
            return state;
    }
}

export default searchBarReducer;