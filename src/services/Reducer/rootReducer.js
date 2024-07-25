import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import NumReducer from "./NumReducer";

const rootReducer = combineReducers({
    AuthReducer,
    NumReducer
});

export default rootReducer