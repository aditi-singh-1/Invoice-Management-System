var EditReducer = (state = { current: false, data:[] }, action) => {
    switch (action.type) {
      case "EDIT_ROW":
        return { ...state, current: !state.current };
      case "EDIT_ROW_QUERY":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
export default EditReducer;