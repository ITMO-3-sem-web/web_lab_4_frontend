import {
    ADD_POINT_TO_POINTS_TABLE,
    CLEAR_FORM,
    CLEAR_POINTS_TABLE,
    FETCH_POINTS_TABLE,
    SET_FORM_DATA,
    SEND_FORM_DATA
} from "./types";
import {act} from "@testing-library/react";


const initialState = {
    points: [],
    formData: {
        x: null,
        y: null,
        r: null,
    }
}

const testState = {
    points: [],
    formData: {
        x: null,
        y: null,
        r: null,
    }
}
// todo Replace 'testState' with 'initialState'
export default function mainPageReducer( state = testState, action ) {
    console.log('action = ', action)
    switch ( action.type ) {
        case ADD_POINT_TO_POINTS_TABLE:
            return {...state, points: state.points.concat([action.payload])}
        case CLEAR_POINTS_TABLE:
            return {...state, points: []}
        case FETCH_POINTS_TABLE:
            return {...state, points: action.payload }
        case SET_FORM_DATA:
            return {...state, formData: action.payload }
        case SEND_FORM_DATA: // mb вообще убрать этот метод
            return {...state, formData: action.payload }
        case CLEAR_FORM:
            console.log('--- clear form inside reDucer')
            return {...state, formData: {x: null, y: null, r: null}}
        default:
            return state
    }
}