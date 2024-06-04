import { combineReducers } from "redux";
import authReducer from '../slice/Auth'

const rootReducer=combineReducers({
    auth:authReducer,
    
})

export default rootReducer;