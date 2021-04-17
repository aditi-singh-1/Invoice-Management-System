const CheckBoxReducer = (state = { current: false }, action) => {
    switch (action.type) {
      case "CHECKBOX":
        return { ...state, current: !state.current };
      default:
        return state;
    }
  };
  export default CheckBoxReducer;