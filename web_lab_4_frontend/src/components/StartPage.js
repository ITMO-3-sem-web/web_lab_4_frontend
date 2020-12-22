import React, { Component } from 'react'
import { SERVER_START_PAGE_URL } from '../config'
import {hideAlert, sendFormData, setFormData, showAlert, signInUser} from "../redux/actions";
import { connect } from 'react-redux'
import Header from "./Header";
import Alert from "./Alert";
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class StartPage extends Component {

    loginInputElem
    passwordInputElem

    render() {
        if (!localStorage.getItem('authorised')) {
            localStorage.setItem('authorised', "no")
        }
        if (localStorage.getItem('authorised') === 'yes') {
            this.props.authoriseUser()
        }
        if (this.props.authorised) {
            return <Redirect to="/mainPage" from="/startPage"/>
        }
        return (
            <div>
                <form onChange={this.handleFormChange.bind(this)} onSubmit={(event) => event.preventDefault()}>
                    <Header/>
                    {this.props.alert && <Alert alertText={this.props.alert}/>}
                    <label htmlFor="loginInput" className="form-label">Логин</label>
                    <input id="loginInput" type="text" className="form-control" required={true}
                           placeholder="Введите логин..."
                           aria-describedby="basic-addon1" ref={(inputElem) => {
                        this.loginInputElem = inputElem
                    }}/>
                    <label htmlFor="passwordInput" className="form-label">Пароль</label>
                    <input id="passwordInput" type="password" className="form-control" required={true}
                           placeholder="Введите пароль..."
                           aria-describedby="basic-addon1" ref={(inputElem) => {
                        this.passwordInputElem = inputElem
                    }}/>
                    <input className="btn btn-primary" type="button" value="Зарегистрироваться"
                           onClick={this.handleRegisterUser.bind(this)}/>
                    <input className="btn btn-primary" type="button" value="Авторизоваться"
                           onClick={this.handleAuthUser.bind(this)}/>
                </form>
            </div>
        )
    }

    handleFormChange() {
        this.props.hideAlert()
    }

    handleRegisterUser() {

        const login = this.loginInputElem.value
        const password = this.passwordInputElem.value

        if (login.length < 3 && password.length < 3) {
            this.props.showAlert('Логин а пароль должны быть не короче 3 знаков..')
            return
        }

        const request = '?login=' + login + '&password=' + password + '&type=registration'


        try {
            return axios.get(SERVER_START_PAGE_URL + request).then(response => {
                const data = response.data

                if (data.result === 'OK') {
                    localStorage.setItem('authorised', 'yes')
                    this.props.authoriseUser()

                } else {
                    this.props.showAlert(data.message)
                }

                window.response = response
            }).catch((e) => {
                this.props.showAlert('При загрузке данных произошла ошибка.')
            });
        } catch (e) {
            this.props.showAlert('При загрузке данных произошла ошибка.')
        }
    }


    handleAuthUser() {
        const login = this.loginInputElem.value
        const password = this.passwordInputElem.value

        if (login.length < 3 && password.length < 3) {
            this.props.showAlert('Логин а пароль должны быть не короче 3 знаков..')
            return
        }

        const request = '?login=' + login + '&password=' + password + '&type=authorisation'

        try {
            return axios.get(SERVER_START_PAGE_URL + request).then(response => {
                const data = response.data
                if (data.result === 'OK') {
                    localStorage.setItem('authorised', 'yes')
                    this.props.authoriseUser()

                } else {
                    this.props.showAlert(data.message)
                }

            });
        } catch (e) {
            this.props.showAlert('При загрузке данных произошла ошибка.')
        }
    }
}



function mapStateToProps( state ) {

    return {
        alert: state.app.alert,
        authorised: state.user.authorised
    }
}

// В этом не особо много смысла,
function mapDispatchToProps( dispatch ) {
    return {
        showAlert: ( alertText, timeLimitMS ) => {
            dispatch(showAlert( alertText, timeLimitMS ))
        },
        hideAlert: () => {
            dispatch(hideAlert())
        },
        authoriseUser: () => {
            dispatch(signInUser())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (StartPage)