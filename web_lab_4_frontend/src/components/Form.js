import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    clearForm,
    clearPointsTable,
    hideAlert,
    sendFormData,
    setFormData,
    showAlert
} from "../redux/actions";
import {isValidFormData, isValidR, isValidX} from "../util/validators";




class Form extends Component {

    x
    y
    r

    xInputElem
    yInputElem
    rInputElem
    formElem
    submitButtonElem
    clearTableButtonElem
    clearFormButtonElem

    componentDidMount() {

    }

    render() {
        return (
            <div className="form-group">
                <form
                    onSubmit={ ( event ) => this.handleSubmit( event ) }
                    onChange={ ( event ) => this.handleFormInputsChange( event )}
                    ref={ (input) => {this.formElem = input}}>

                    <div className="mb-3">
                        <label htmlFor="xInput" className="form-label">Значение X</label>
                        <input
                            className="form-control"
                            list="datalistXOptions"
                            id="xInput"
                            maxLength={5}
                            required={true}
                            placeholder="Введите целый x в диапазоне [-5...3]... "
                            ref={ ( inputElem ) => { this.xInputElem = inputElem }}/>
                        <datalist id="datalistXOptions">
                            <option value="-5" />
                            <option value="-4" />
                            <option value="-3" />
                            <option value="-2" />
                            <option value="-1" />
                            <option value="0" />
                            <option value="1" />
                            <option value="2" />
                            <option value="3" />
                        </datalist>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yInput" className="form-label">Значение Y</label>
                        <input id="yInput" type="text" className="form-control" required={true} placeholder="Введите y в диапазоне (-3...5)..." maxLength={5}
                               aria-describedby="basic-addon1" ref={ ( inputElem ) => { this.yInputElem = inputElem }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rInput" className="form-label">Значение R</label>
                        <input
                            className="form-control"
                            list="datalistROptions"
                            id="rInput"
                            maxLength={5}
                            required={true}
                            placeholder="Введите целый r в диапазоне [-5...3]... "
                            ref={ ( inputElem ) => { this.rInputElem = inputElem }}
                            onChange={this.handleRChange.bind(this)}/>
                        <datalist id="datalistROptions">
                            <option value="-5" />
                            <option value="-4" />
                            <option value="-3" />
                            <option value="-2" />
                            <option value="-1" />
                            <option value="0" />
                            <option value="1" />
                            <option value="2" />
                            <option value="3" />
                        </datalist>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Проверить" />
                    <input className="btn btn-primary" type="button" value="Очистить форму" onClick={this.handleClearForm.bind(this)} ref={ (input) => {this.clearFormButtonElem = input}} />
                    <input className="btn btn-primary" type="button" value="Очистить таблицу" onClick={this.handleClearTable.bind(this)} ref={ (input) => {this.clearTableButtonElem = input}} />
                </form>
            </div>
        )
    }

    initialize() {

    }

    handleClearForm() {
        this.formElem.reset()
        this.props.clearForm()
    }

    handleClearTable() {
        this.props.clearPointsTable()
    }

    handleSubmit( event ) {

        console.log('Handles submit')
        event.preventDefault()

        if ( ! isValidFormData(
            this.xInputElem.value,
            this.yInputElem.value,
            this.rInputElem.value)) {
            console.log('раз два три')
            this.props.showAlert('Правильно заполните все поля формы!')
        } else {

            this.props.sendFormData(
                {
                    x: this.xInputElem.value,
                    y: this.yInputElem.value,
                    r: this.rInputElem.value
                }
            )
            this.handleClearForm()

        }

    }

    handleRChange() {
        console.log('--- this: ', this)
        if ( isValidR( this.rInputElem.value )) {
            this.props.setFormData({
                x: null,
                y: null,
                r: this.rInputElem.value
            })
        } else {
            this.props.clearForm()
        }
    }

    handleFormInputsChange( event ) {

        this.props.hideAlert()

    }
}

function mapStateToProps( state ) {
    console.log('---', ' state = ', state)
    return {
        formData: state.mainPage.formData,
        alert: state.app.alert
    }
}

// В этом не особо много смысла,
function mapDispatchToProps( dispatch ) {
    return {
        setFormData: ( formData ) => {
            dispatch(setFormData( formData ))
        },
        sendFormData: ( formData ) => {
            dispatch(sendFormData( formData ))
        },
        showAlert: ( alertText, timeLimitMS ) => {
            dispatch(showAlert( alertText, timeLimitMS ))
        },
        clearForm: () => {
          dispatch(clearForm())
        },
        hideAlert: () => {
            dispatch(hideAlert())
        },
        clearPointsTable: () =>
            dispatch(clearPointsTable())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Form)