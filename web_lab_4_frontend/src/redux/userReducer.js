import {
    SIGN_IN,
    LOG_OUT
} from "./types";


const initialState = {
    authorised: false
}

export default function userReducer( state = initialState, action ) {
    switch ( action.type ) {
        case SIGN_IN:
            return { ...state, authorised: true }
        case LOG_OUT:
            return { ...state, authorised: false }
        default:
            return state;
    }
}