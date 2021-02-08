import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'    
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/app'
import rootReducer from './reducers'
import {jwtDecode} from './utils/jwt'
import { setUser } from './actions/auth';
import {fetchStreams} from './actions/stream'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

if(localStorage.getItem("token")){
    const token = jwtDecode(localStorage.getItem("token"));
    store.dispatch(setUser(token.payload))
}

store.dispatch(fetchStreams())

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.querySelector("#root")
)