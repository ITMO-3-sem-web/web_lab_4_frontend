import React, { Component } from 'react'




class Form extends Component {


    render() {
        return (
            <div className="form-group">

                <label htmlFor="xInput" className="form-label">Значение R</label>
                <input
                    className="form-control"
                    list="datalistOptions"
                    id="xInput"
                    maxLength={4}
                    placeholder="Введите 'r'" />
                    <datalist id="datalistOptions">
                        <option value="1" />
                        <option value="2" />
                        <option value="3" />
                        <option value="4" />
                        <option value="5" />
                    </datalist>

            </div>
        )
    }
}

export default Form