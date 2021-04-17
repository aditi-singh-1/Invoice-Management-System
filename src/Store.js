import { createStore } from "redux";
import rootReducer from "./Reducers/rootReducer"

const Storage = createStore(rootReducer);
export default Storage;