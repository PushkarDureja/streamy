import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../actions/auth'
import './styles/form.css'
import {addFlashMessage} from '../actions/flash'
import fb from '../config/firebase'


const Login = (props)=>{

    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    useEffect(()=>{
        if(props.user)
            props.history.push('/')
    },[props])
    

    function handleLogin(e){
      e.preventDefault();
      fb.auth()
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
          props.addFlashMessage({
            type: "success",
            text: "Logged in successfully",
          });
          props.auth(user,email, pass);
        })
        .catch((err) => {
          props.addFlashMessage({
            type: "error",
            text: `${err.message}`,
          });
          console.log(err);
        });
    }




    return(
       <div className="container outerbox">
      <div className="text-center">
        <h3>Login to Streamy</h3>
      </div>
      <form id="1" onSubmit={handleLogin} className="form-box">
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input-background form-control"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            className="form-control input-background"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark submit-btn"
          style={{ width: "100%", alignText: "center" }}
          form="1"
        >
          Login
        </button>
      </form>
      <p className="asker-div">
        New to Streamy? <Link to="/signup">Signup</Link>
      </p>
    </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        user : state.user.user
    }
}
export default connect(mapStateToProps,{
    auth : login,
    addFlashMessage : addFlashMessage
})(Login)