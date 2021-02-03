import React,{useEffect} from "react";
import {BrowserRouter,Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Navbar from './navbar'
import Home from './Home'
import Login from './login'
import CreateStream from './createStream'
import SignUp from './signup'
import fb from '../config/firebase'
import {setUser,clearUser} from '../actions/auth'


const App = ({dispatch})=>{

    useEffect(()=>{
        const unsubscribe = fb.auth().onAuthStateChanged(user=>{
            if(user){
                dispatch(setUser(user));

            }
            else
                dispatch(clearUser())
        })
        return ()=>unsubscribe()
    },[])

    return(
        <div>
            
            <BrowserRouter>
                <Navbar/>
                <Route path = '/' exact component = {Home}/>
                <Route path = '/login' exact component = {Login}/>
                <Route path = '/live' exact component = {CreateStream}/>
                <Route path = '/signup' exact component = {SignUp}/>
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