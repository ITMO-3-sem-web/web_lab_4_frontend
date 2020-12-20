import  { combineReducers } from "redux";
import startPageReducer from './startPageReducer'
import mainPageReducer from './mainPageReducer'
import appReducer from './appReducer'


export const rootReducer = combineReducers({
                startPage: startPageReducer,
                mainPage: mainPageReducer,
                app: appReducer
})

