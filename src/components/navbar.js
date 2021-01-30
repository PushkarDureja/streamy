import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import fb from '../config/firebase'
import {clearUser} from '../actions/auth'
const Navbar = (props)=>{

    function handleLogout(e){
        e.preventDefault()
        fb.auth().signOut().then(()=>{
            props.dispatch(clearUser());
        })
    }
    


    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to = '/'>Streamy</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end" style = {{width:'100%'}}>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to = '/live'>Go Live</Link>
                    </li>
                    {props.user ?
                        <li className="nav-item">
                            <a className="nav-link" onClick = {handleLogout} type = "button">Logout</a>
                        </li>:
                        <li className="nav-item">
                        <Link className="nav-link" to = '/login'>Login</Link>
                    </li>
                     }
                    
                
                </ul>
            
            </div>
        </div>
        </nav>
    )
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Navbar)