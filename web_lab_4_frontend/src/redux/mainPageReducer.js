import {
    ADD_POINT_TO_POINTS_TABLE,
    CLEAR_FORM,
    CLEAR_POINTS_TABLE,
    FETCH_POINTS_TABLE,
    SET_FORM_DATA,
    SEND_FORM_DATA
} from "./types";


const initialState = {
    points: [],
    formData: {
        x: null,
        y: null,
        r: null,
    }
}

const testState = {
    points: [
        {
            x: 1,
            y: 2,
            r: 3,
            ans: 'yes'
        },
        {
            x: 3,
            y: 4,
            r: 2,
            ans: 'no'
        },
        {
            x: -3,
            y: -1,
            r: 3,
            ans: 'yes'
        },
    ],
    formData: {
        x: null,
        y: null,
        r: null,
    }
}
// todo Replace 'testState' with 'initialState'
export default function mainPageReducer( state = testState, action ) {
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
            return {...state, formData: {x: null, y: null, r: null}}
        default:
            return state
    }
}