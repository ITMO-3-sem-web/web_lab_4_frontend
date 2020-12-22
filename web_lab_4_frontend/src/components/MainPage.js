import React, { Component } from 'react'
import InteractiveGraph from "./InteractiveGraph";
import { connect } from 'react-redux'
import Footer from "./Footer";
import Header from "./Header";
import Form from "./Form";
import PointsTable from "./PointsTable";
import Alert from "./Alert";
import {hideAlert, logOutUser, sendFormData, setFormData, showAlert} from "../redux/actions";
import { Redirect, Link } from 'react-router-dom'

class MainPage extends Component {

    render() {
        if ( ! this.props.authorised ) {
            return <Redirect to="/startPage"  from="/mainPage"/>
        }

        return (
            <div>
                <Header />
                <Link to="/startPage" onClick={this.handleLinkClick.bind(this)}>Выйти из аккаунта</Link>
                <InteractiveGraph />
                {this.props.alert && <Alert alertText={this.props.alert} /> }
                <Form />
                <PointsTable />
            </div>
        );
    }


    handleLinkClick() {
        localStorage.setItem('authorised', 'no')

        this.props.logOutUser()
        this.props.hideAlert()

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
        logOutUser: () => {
            dispatch(logOutUser())
        },
        hideAlert: () => {
            dispatch(hideAlert())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MainPage)