import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import './styles/navbar.css'

const Navbar = (props)=>{
  // console.log(props)
    function handleLogout(e){
        e.preventDefault()
        props.logout();
    }
    

return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid" >
        <Link className="navbar-brand mx-3" to="/">
          <i class="fa fa-cube"></i> Streamy
        </Link>
        
        <div class="btn-group">
            <Link class="dropdown-toggle avatar"  data-letters={
                  props.user !== null
                    ? props.user.email[0].toUpperCase()
                    : "☰"
                } data-bs-toggle="dropdown" aria-expanded="false">

            </Link>
            <ul class="dropdown-menu dropdown-menu-end">
            {props.user ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/live">
                        <i class="fa fa-user-o"></i> Go Live
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mystream">
                        <i class="fa fa-sliders"></i> My Streams
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}

                {props.user ? (
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={handleLogout}
                      type="button"
                    >
                      <i className="material-icons">&#xE8AC;</i> Logout
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="material-icons">&#xE8AC;</i> Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        <i className="material-icons">&#xE8AC;</i> SignUp
                      </Link>
                    </li>
                  </>
                )}
            </ul>
        </div>
      </div>
    </nav>
    )
}
const mapStateToProps = (state)=>{
    return {
        user:state.user.user
    }
}
export default connect(mapStateToProps,{
    logout
})(withRouter(Navbar))