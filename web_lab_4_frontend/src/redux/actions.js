import {
    SHOW_ALERT,
    HIDE_ALERT,
    ADD_POINT_TO_POINTS_TABLE,
    CLEAR_POINTS_TABLE,
    FETCH_POINTS_TABLE,
    SEND_FORM_DATA,
    CLEAR_FORM,
    SET_FORM_DATA,
    LOG_OUT,
    SIGN_IN
} from './types'

import {
    SERVER_MAIN_PAGE_ADD_POINT_URL,
    SERVER_MAIN_PAGE_CLEAR_URL,
    SERVER_MAIN_PAGE_URL,
    SERVER_START_PAGE_URL
} from '../config'
import { FORBIDDEN } from "../util/responseStatuses";
import axios from 'axios'


export function showAlert( alertText, timeLimitMS = 0 ) { // Можно сделать асинхронной, скрывающей Alert через 3 секунды
    if ( timeLimitMS !== 0) {
        return (dispatch) => {
            dispatch({
                type: SHOW_ALERT,
                payload: alertText
            })

            console.log('--- timlimit')
            setTimeout(() => {
                dispatch(hideAlert())
            }, timeLimitMS)
        }
    } else {
        return {
            type: SHOW_ALERT,
            payload: alertText
        }
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function addPointToPointsTable( point ) {
    return {
        type: ADD_POINT_TO_POINTS_TABLE,
        payload: point
    }
}

export function clearPointsTable() {


        axios.get(SERVER_MAIN_PAGE_CLEAR_URL)
        console.log('clears table')
        return {
            type: CLEAR_POINTS_TABLE
        }

}

export function fetchPointsTable() {
    console.log('--- fetchPointsTable func execs')

    return (dispatch) => {

        axios.get(SERVER_MAIN_PAGE_URL).then(
            r => {
                window.points = r.data
                console.log(')()()()()()', r)
                dispatch({type: FETCH_POINTS_TABLE, payload: r.data})
            } )

    }

}

// Accepts object {x:'', y:'', r:''}
export function sendFormData( formData ) {
    let request
    try {
        request = '?x=' + formData.x + '&' +
            'y=' + formData.y + '&' +
            'r=' + formData.r
    } catch (e) {
        alert('invalid formData in "sendFormData"' + formData.json())
        return
    }

    return async ( dispatch ) => {
        axios.get(SERVER_MAIN_PAGE_ADD_POINT_URL  + request).then(
            r => {
                window.points = r.data
                console.log(')()()()()()', r)

                dispatch(fetchPointsTable()) // todo error can be here
            })
    }

}

export function setFormData( formData ) {
    console.log('--- setFormData')
    return {
        type: SET_FORM_DATA,
        payload: formData
    }
}

// Скорее всего не нужна
export function clearForm() {
    console.log('--- clearForm')
    return setFormData({
        x: null,
        y: null,
        r: null
    })
}

export function signInUser() {
    return {
        type: SIGN_IN
    }
}

export function logOutUser() {
    return {
        type: LOG_OUT
    }
}