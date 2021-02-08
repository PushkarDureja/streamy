import React,{ useEffect} from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Navbar from './navbar'
import Home from './Home'
import Login from './login'
import CreateStream from './createStream'
import SignUp from './signup'
import MyStream from "./mystreams";
import ProtectedRoute from './protectedroute'
import {fetchStreams} from '../actions/stream'
import Player from './player'
import FlashMessage from "./flash/flash";
import PlayerRoute from './playerRoute'
import  NotFound  from "./error/notfound";



const App = (props)=>{


    return(
        <div>
            
            <BrowserRouter>
                <Navbar/>
                <Switch>
                {props.flash!=='' ? <FlashMessage/> : null}
                <Route path = '/' exact component = {Home}/>
                <Route path = '/login' exact component = {Login}/>
                <ProtectedRoute path = '/live' exact component = {CreateStream}/>
                <Route path = '/signup' exact component = {SignUp}/>
                <ProtectedRoute path = '/mystream' exact component = {MyStream}/>
                <PlayerRoute path = '/stream/:id' exact component = {Player}/>
                <Route component = {NotFound}/>
                </Switch>
            </BrowserRouter>

        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        user : state.user.user,
        streams : state.stream.stream,
        flash : state.flash.text
    }
}

export default connect(mapStateToProps,{
    fetchStreams : fetchStreams
})(App)