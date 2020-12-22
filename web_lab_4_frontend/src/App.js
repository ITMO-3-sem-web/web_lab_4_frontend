import './App.css';
import MainPage from './components/MainPage'
import Form from './components/Form'
import React, { Component } from "react";
import { connect } from 'react-redux'
import InteractiveGraph from "./components/InteractiveGraph";
import PointsTable from "./components/PointsTable";
import StartPage from "./components/StartPage";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {logOutUser} from "./redux/actions";

class App extends Component {

    render() {
    return (
        <div className="vertical-center text-center">
            <div className="container">
                <Switch>
                    <Route path="/startPage">
                        <StartPage/>
                    </Route>

                    <Route path="/mainPage">
                        <MainPage/>
                    </Route>

                    <Route path="/">
                        <StartPage/>
                    </Route>

                </Switch>

            </div>
        </div>
    );
}
}

function mapStateToProps( state ) {
    return {
        authorised: state.user.authorised
    }
}

// В этом не особо много смысла,
function mapDispatchToProps( dispatch ) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App)
