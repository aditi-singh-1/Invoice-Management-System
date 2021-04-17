import { combineReducers } from "redux";
import dataFetcherReducer from "./dataFetcherReducer";
import CheckBoxReducer from './checkboxreducer';
import AddReducer from './addReduer';
import BodyCheckBoxReducer from './bodycheckbox';
import EditReducer from './editbtnReducer';
import DeleteReducer from './deleteReducer';
import searchBarReducer from './searchReducer'

const rootReducer = combineReducers({
	dataFetcherReducer: dataFetcherReducer,
	checkBoxReducer:CheckBoxReducer,
	AddReducer:AddReducer,
	BodyCheckBoxReducer:BodyCheckBoxReducer,
	EditReducer:EditReducer,
	DeleteReducer:DeleteReducer,
	searchBarReducer:searchBarReducer,
})

export default rootReducer;
