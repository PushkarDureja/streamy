import React,{useEffect} from "react";
import {BrowserRouter,Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Navbar from './navbar'
import Home from './Home'
import Login from './login'
import CreateStream from './createStream'
import SignUp from './signup'
import MyStream from "./mystreams";
import ProtectedRoute from './protectedroute'


const App = ()=>{

    return(
        <div>
            
            <BrowserRouter>
                <Navbar/>
                <Route path = '/' exact component = {Home}/>
                <Route path = '/login' exact component = {Login}/>
                <ProtectedRoute path = '/live' exact component = {CreateStream}/>
                <Route path = '/signup' exact component = {SignUp}/>
                <ProtectedRoute path = '/mystream' exact component = {MyStream}/>
            </BrowserRouter>

        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(App)