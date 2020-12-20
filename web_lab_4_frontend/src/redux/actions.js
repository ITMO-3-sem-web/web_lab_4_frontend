import {
    SHOW_ALERT,
    HIDE_ALERT,
    ADD_POINT_TO_POINTS_TABLE,
    CLEAR_POINTS_TABLE,
    FETCH_POINTS_TABLE,
    SEND_FORM_DATA,
    CLEAR_FORM,
    SET_FORM_DATA
} from './types'

import { SERVER_URL } from '../config'


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
    return {
        type: CLEAR_POINTS_TABLE
    }
}

export function fetchPointsTable() {
    console.log('--- fetchPointsTable func execs')
    return async ( dispatch ) => {
        try {
            const response = await fetch(SERVER_URL) // - отправляем запрос серверу на получение существующих точек
            const json = await response.json()

            let loadingErrorOccured = false
            let points = []
            let point


            json.forEach( (pointIt) => {
                try {
                    point = {
                        x: pointIt.x,
                        y: pointIt.y,
                        r: pointIt.r
                    }

                    points.concat([point])
                } catch (e) {
                    loadingErrorOccured = true;
                    console.log('Нарушена структура объекта точки: ' , pointIt)
                }
            })

            dispatch({type: FETCH_POINTS_TABLE, payload: points})

            if ( loadingErrorOccured ) {
                dispatch(showAlert('При загрузке с сервера некоторые данные были повреждены.'))
            }

        } catch (e) {
            dispatch(showAlert('При загрузке данных с сервера произошла ошибка.'))
        }
    }
}


export function sendFormData( formData ) {
    console.log('--- sendFormData func execs')
    return async ( dispatch ) => {
        try {
            // todo Добавить данные точки для отправки НА сервер
            const response = await fetch(SERVER_URL) // - отправляем запрос серверу на получение существующих точек
            const json = await response.json()
            if (json.type === 'SUCCESS') {
                try {
                    const point = {
                        x: json.x,
                        y: json.y,
                        r: json.y
                    }

                    dispatch(addPointToPointsTable(point))

                } catch (e) {
                    dispatch(showAlert('С сервера получены неверные данные'))
                }
            } else if (json.type === 'ERROR') {
                dispatch(showAlert('Вы отправили неправильные данные на сервер'))
            } else {
                dispatch(showAlert('С сервера получены неверные данные'))
            }

        } catch (e) {
            dispatch(showAlert('При загрузке данных с сервера произошла ошибка.'))
        }
    }
}

export function setFormData( formData ) {
    return {
        type: SET_FORM_DATA,
        payload: formData
    }
}

// Скорее всего не нужна
export function clearForm() {
    setFormData({
        x: null,
        y: null,
        r: null
    })
}