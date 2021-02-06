import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'    
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/app'
import reducer from './reducers'
import {jwtDecode} from './utils/jwt'
import { setUser } from './actions/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

if(localStorage.getItem("token")){
    const token = jwtDecode(localStorage.getItem("token"));
    store.dispatch(setUser(token.payload))
}

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.querySelector("#root")
)