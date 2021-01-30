import React from "react";
import {BrowserRouter,Route} from 'react-router-dom'

import Navbar from './navbar'
import Home from './Home'
import Login from './login'
import CreateStream from './createStream'
import SignUp from './signup'

const App = ()=>{
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
export default App