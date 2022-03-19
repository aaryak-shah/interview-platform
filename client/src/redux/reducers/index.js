import { combineReducers } from "redux"
/************************ REDUCERS STARTS HERE************************/
//import all Reducer functions here
import user from "./user"

/************************ REDUCERS ENDS HERE**************************/
const rootReducer = combineReducers({ user })

export default rootReducer
