import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {signup} from '../actions/auth'
import fb from '../config/firebase'
import {Link} from 'react-router-dom'
import { addFlashMessage } from "../actions/flash";

const SignUp = ({auth,user,history,addFlashMessage})=>{
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

  useEffect(()=>{
      if(user)
          history.push('/')
  },[user])

function handleSignUp(e){
  e.preventDefault();
  fb.auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((user) => {
      addFlashMessage({
        type: "success",
        text: "Signed up successfully",
      });
      auth(user);
    })
    .catch((err) => {
      addFlashMessage({
        type: "error",
        text: `${err.message}`,
      });
      console.log(err);
    });
    
}

    return(
    <div className="container outerbox">
      <div className="text-center">
        <h3>SignUp to Streamy</h3>
      </div>
      <form id="1" onSubmit={handleSignUp} className="form-box">
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
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
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
          form="1"
        >
          SignUp
        </button>
      </form>
      <p className="asker-div">
        Already on Streamy? <Link to="/login">Login</Link>
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
    auth : signup,
    addFlashMessage : addFlashMessage
})(SignUp)