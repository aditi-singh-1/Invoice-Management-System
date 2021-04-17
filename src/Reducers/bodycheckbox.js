const BodyCheckBoxReducer = (state = { current: false, data:new Set() }, action) => {
    switch (action.type) {
        case "BODYCHECKBOX":
            return {...state, current : !state.current, data:action.payload};
        default:
            return state;
        }
      };
 export default BodyCheckBoxReducer;