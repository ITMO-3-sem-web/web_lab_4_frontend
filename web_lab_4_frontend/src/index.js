import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { rootReducer } from "./redux/rootReducer";
import App from './App';
import { BrowserRouter, Route, Link } from "react-router-dom"

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

render(
    app,
    document.getElementById('root')
);

