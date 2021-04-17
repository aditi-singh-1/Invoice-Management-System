var DeleteReducer = (state = { current: false }, action) => {
    switch (action.type) {
      case "DELETE_ROW":
        return { ...state, current: !state.current };
    default:
        return state;
    }
  };
export default DeleteReducer;