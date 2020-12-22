import  { combineReducers } from "redux";
import startPageReducer from './startPageReducer'
import mainPageReducer from './mainPageReducer'
import appReducer from './appReducer'
import userReducer from "./userReducer";


export const rootReducer = combineReducers({
                startPage: startPageReducer,
                mainPage: mainPageReducer,
                app: appReducer,
                user: userReducer
})

