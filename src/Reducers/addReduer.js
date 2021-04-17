import {ADD_BTN,ADD_ROW} from '../Actions/Addbtn';

var AddReducer = (state = { current: false, data:[] }, action) => {
    switch (action.type) {
      case "ADD_BTN":
        return { ...state, current: !state.current };
      case "ADD_ROW":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
export default AddReducer;